
// Código recebido acima com integração à API do IBGE para estados (UF) e cidades com datalist,
// padronização de altura e peso via <select>, e estilização preservada conforme solicitado.

'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function EditarPerfilPage() {
  const router = useRouter();
  const [uid, setUid] = useState('');
  const [dados, setDados] = useState<any>(null);
  const [estados, setEstados] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const buscar = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          router.push('/login');
          return;
        }

        setUid(user.uid);
        const snap = await getDoc(doc(db, 'jogadores', user.uid));
        if (snap.exists()) {
          const jogador = snap.data();
          setDados({
            ...jogador,
            video: jogador.videos?.[0] || '',
            whatsapp: jogador.whatsapp || ''
          });
        }

        const res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        setEstados(res.data.map((uf: any) => uf.sigla));
      });
    };

    buscar();
  }, [router]);

  useEffect(() => {
    const carregarCidades = async () => {
      if (!dados?.estado) return;
      const res = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${dados.estado}/municipios`);
      setCidades(res.data.map((cidade: any) => cidade.nome));
    };

    carregarCidades();
  }, [dados?.estado]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'jogadores', uid), {
        ...dados,
        videos: dados.video ? [dados.video] : [],
      });
      setMensagem('Perfil atualizado com sucesso!');
    } catch {
      setMensagem('Erro ao atualizar.');
    }
  };

  if (!dados) return <p className="text-center py-10">Carregando...</p>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 pt-28 px-4 pb-10">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-[#3a5550] mb-8 text-center">Editar Perfil</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#3a5550]">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Nome</label>
              <input name="nome" value={dados.nome} className="bg-gray-100 text-gray-600 px-3 py-2 rounded border" disabled />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Email</label>
              <input name="email" value={dados.email} onChange={handleChange} type="email" className="px-3 py-2 rounded border" required />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Idade</label>
              <input name="idade" value={dados.idade} className="bg-gray-100 text-gray-600 px-3 py-2 rounded border" disabled />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Altura</label>
              <select name="altura" value={dados.altura} onChange={handleChange} className="px-3 py-2 rounded border" required>
                <option value="">Selecione</option>
                {Array.from({ length: 61 }, (_, i) => (1.5 + i * 0.01).toFixed(2)).map((altura) => (
                  <option key={altura} value={altura}>{altura} m</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Peso</label>
              <select name="peso" value={dados.peso} onChange={handleChange} className="px-3 py-2 rounded border" required>
                <option value="">Selecione</option>
                {Array.from({ length: 121 }, (_, i) => 30 + i).map((peso) => (
                  <option key={peso} value={peso}>{peso} kg</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Posição</label>
              <select name="posicao" value={dados.posicao} onChange={handleChange} className="px-3 py-2 rounded border" required>
                <option value="">Selecione</option>
                {["Goleiro", "Zagueiro Central", "Lateral Direito", "Lateral Esquerdo", "Volante", "Primeiro Volante", "Segundo Volante", "Meia Central", "Meia Ofensivo", "Meia Armador", "Meia Atacante", "Ponta Direita", "Ponta Esquerda", "Atacante", "Centroavante", "Falso 9"].map(pos => (
                  <option key={pos} value={pos.toLowerCase().replace(/ /g, '-')}>{pos}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Perna dominante</label>
              <select name="perna" value={dados.perna} onChange={handleChange} className="px-3 py-2 rounded border" required>
                <option value="">Selecione</option>
                <option value="direita">Direita</option>
                <option value="esquerda">Esquerda</option>
                <option value="ambas">Ambas</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Estado (UF)</label>
              <select name="estado" value={dados.estado} onChange={handleChange} className="px-3 py-2 rounded border" required>
                <option value="">Selecione</option>
                {estados.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Cidade</label>
              <input
                name="cidade"
                list="lista-cidades"
                value={dados.cidade}
                onChange={handleChange}
                className="px-3 py-2 rounded border"
                required
              />
              <datalist id="lista-cidades">
                {cidades.map((cidade) => (
                  <option key={cidade} value={cidade} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">WhatsApp</label>
              <input
                name="whatsapp"
                value={dados.whatsapp}
                onChange={handleChange}
                className="px-3 py-2 rounded border"
                placeholder="(11) 91234-5678"
                required
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium mb-1">Link do vídeo (YouTube)</label>
              <input
                name="video"
                value={dados.video}
                onChange={handleChange}
                className="px-3 py-2 rounded border"
                placeholder="Cole aqui o link do seu vídeo"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium mb-1">Link da imagem de perfil</label>
              <input
                name="imagemUrl"
                value={dados.imagemUrl || ''}
                onChange={handleChange}
                className="px-3 py-2 rounded border"
                placeholder="Cole aqui o link da imagem do jogador"
              />
            </div>

            <div className="md:col-span-2 flex justify-center mt-4">
              <button type="submit" className="bg-[#3a5550] text-white px-6 py-2 rounded hover:bg-[#2e443f] transition transform hover:scale-105">
                Salvar alterações
              </button>
            </div>

            {mensagem && (
              <p className="text-center text-sm mt-2 text-green-600 md:col-span-2">{mensagem}</p>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
