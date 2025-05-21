'use client';

import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

interface Cidade {
  id: number;
  nome: string;
}

export default function CadastroJogadorPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    whatsapp: '',
    idade: '',
    altura: '',
    peso: '',
    posicao: '',
    pernaDominante: '',
    cidade: '',
    estado: '',
    imagemUrl: '',
    videoUrl: '',
    planoPremium: false
  });

  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(res => res.json())
      .then(data => setEstados(data));
  }, []);

  useEffect(() => {
    if (formData.estado) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formData.estado}/municipios`)
        .then(res => res.json())
        .then(data => setCidades(data));
    }
  }, [formData.estado]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'planoPremium' ? value === 'premium' : value,
      ...(name === 'estado' && { cidade: '' })
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    try {
      const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
      const uid = cred.user.uid;

      await setDoc(doc(db, "jogadores", uid), {
        ...formData,
        planoPremium: !!formData.planoPremium,
        videos: formData.videoUrl ? [formData.videoUrl] : [],
        uid,
        criadoEm: serverTimestamp()
      });

      setMensagem("Cadastro realizado com sucesso!");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErro("Este e-mail já está em uso. Tente outro.");
      } else {
        console.error("Erro ao cadastrar:", error);
        setErro("Erro ao criar conta. Verifique os dados e tente novamente.");
      }
    }
  };

  const gerarAlturas = () => {
    const alturas: string[] = [];
    for (let i = 1.50; i <= 2.10; i += 0.01) {
      alturas.push(i.toFixed(2));
    }
    return alturas;
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-200"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-[#3a5550]">Cadastro de Jogador</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Nome</label>
              <input name="nome" value={formData.nome} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Idade</label>
              <input name="idade" type="number" min="10" max="50" value={formData.idade} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Senha</label>
              <input name="senha" type="password" value={formData.senha} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">WhatsApp</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                placeholder="11993189985"
                pattern="[0-9]{11}"
                maxLength={11}
                className="w-full px-4 py-2 border rounded-md text-[#3a5550]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Estado</label>
              <select name="estado" value={formData.estado} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]">
                <option value="">Selecione</option>
                {estados.map((estado) => (
                  <option key={estado.id} value={estado.sigla}>{estado.sigla}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Cidade</label>
              <select name="cidade" value={formData.cidade} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]">
                <option value="">Selecione</option>
                {cidades.map((cidade) => (
                  <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Altura</label>
              <select name="altura" value={formData.altura} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]">
                <option value="">Selecione</option>
                {gerarAlturas().map((altura) => (
                  <option key={altura} value={altura}>{altura} m</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Peso</label>
              <select name="peso" value={formData.peso} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]">
                <option value="">Selecione</option>
                {Array.from({ length: 121 }, (_, i) => 30 + i).map((peso) => (
                  <option key={peso} value={peso}>{peso} kg</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Posição</label>
              <select name="posicao" value={formData.posicao} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]">
                <option value="">Selecione</option>
                {["Goleiro", "Zagueiro Central", "Lateral Direito", "Lateral Esquerdo", "Volante", "Primeiro Volante", "Segundo Volante", "Meia Central", "Meia Ofensivo", "Meia Armador", "Meia Atacante", "Ponta Direita", "Ponta Esquerda", "Atacante", "Centroavante", "Falso 9"].map(pos => (
                  <option key={pos} value={pos.toLowerCase().replace(/ /g, '-')}>{pos}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Perna dominante</label>
              <select name="pernaDominante" value={formData.pernaDominante} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]">
                <option value="">Selecione</option>
                <option value="direita">Direita</option>
                <option value="esquerda">Esquerda</option>
                <option value="ambas">Ambas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Plano</label>
              <select
                name="planoPremium"
                value={formData.planoPremium ? 'premium' : 'basico'}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md text-[#3a5550]"
              >
                <option value="">Selecione</option>
                <option value="basico">Plano Básico</option>
                <option value="premium">Plano Premium</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-[#3a5550] mb-1">Link da imagem</label>
            <input name="imagemUrl" value={formData.imagemUrl} onChange={handleChange} className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-[#3a5550] mb-1">Link do vídeo (YouTube)</label>
            <input
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=xyz"
              className="w-full px-4 py-2 border rounded-md text-[#3a5550]"
            />
          </div>

          {erro && <p className="text-red-500 text-sm mt-4 text-center">{erro}</p>}
          {mensagem && <p className="text-green-600 text-sm mt-4 text-center">{mensagem}</p>}

          <button type="submit" className="w-full mt-6 bg-[#3a5550] text-white py-2 rounded-md font-semibold hover:bg-[#2e443f] transition">
            Cadastrar
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
