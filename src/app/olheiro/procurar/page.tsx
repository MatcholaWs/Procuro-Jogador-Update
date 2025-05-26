'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '@/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

interface Jogador {
  id: string;
  nome: string;
  idade: number;
  altura: string;
  peso: string;
  posicao: string;
  perna: string;
  cidade: string;
  estado: string;
  whatsapp: string;
  videos: string[];
  imagemUrl?: string;
  planoPremium?: boolean;
}

const estadosUF = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];


export default function ProcurarTalentosPage() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [filtros, setFiltros] = useState({
    posicao: '',
    estado: '',
    cidade: '',
    perna: '',
    idadeMin: '',
    idadeMax: '',
    alturaMin: '',
    alturaMax: '',
    temVideo: ''
  });
  const [resultados, setResultados] = useState<Jogador[]>([]);
  const [planoPremium, setPlanoPremium] = useState<boolean>(false);

  useEffect(() => {
    const buscarJogadores = async () => {
      const snap = await getDocs(collection(db, 'jogadores'));
      const lista = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Jogador[];
      const ordenados = lista.sort((a, b) => (b.planoPremium ? 1 : 0) - (a.planoPremium ? 1 : 0));
      setJogadores(ordenados);
      setResultados(ordenados);
    };

    const verificarOlheiro = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const ref = doc(db, 'olheiros', user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const dados = snap.data();
            setPlanoPremium(dados.planoPremium === true);
          }
        }
      });
    };

    buscarJogadores();
    verificarOlheiro();
  }, []);

  const aplicarFiltro = () => {
    const filtrados = jogadores.filter((j) => {
      const idadeMinOk = filtros.idadeMin ? j.idade >= Number(filtros.idadeMin) : true;
      const idadeMaxOk = filtros.idadeMax ? j.idade <= Number(filtros.idadeMax) : true;
      const posicaoOk = filtros.posicao ? j.posicao === filtros.posicao : true;
      const estadoOk = filtros.estado ? j.estado === filtros.estado : true;
      const cidadeOk = filtros.cidade ? j.cidade === filtros.cidade : true;
      const pernaOk = filtros.perna ? j.perna === filtros.perna : true;
      const alturaMinOk = filtros.alturaMin ? parseFloat(j.altura) >= parseFloat(filtros.alturaMin) : true;
      const alturaMaxOk = filtros.alturaMax ? parseFloat(j.altura) <= parseFloat(filtros.alturaMax) : true;
      const temVideoOk = filtros.temVideo === 'sim' ? j.videos && j.videos.length > 0 : true;

      return idadeMinOk && idadeMaxOk && posicaoOk && estadoOk && cidadeOk && pernaOk && alturaMinOk && alturaMaxOk && temVideoOk;
    });

    const ordenados = filtrados.sort((a, b) => (b.planoPremium ? 1 : 0) - (a.planoPremium ? 1 : 0));
    setResultados(ordenados);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 pt-28">
        <h1 className="text-3xl font-bold text-[#3a5550] mb-8 text-center">Procurar Talentos</h1>

        <h2 className="text-xl font-semibold text-[#3a5550] mt-6 mb-2">Região</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <select
            name="estado"
            value={filtros.estado}
            onChange={(e) => setFiltros({ ...filtros, estado: e.target.value, cidade: '' })}
            className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]"
          >
            <option value="">Todos os Estados</option>
            {estadosUF.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
          </select>

        </div>

        {planoPremium && (
          <>
            <h2 className="text-xl font-semibold text-[#3a5550] mt-6 mb-2">Habilidades</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <select
                name="posicao"
                value={filtros.posicao}
                onChange={(e) => setFiltros({ ...filtros, posicao: e.target.value })}
                className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]"
              >
                <option value="">Todas as Posições</option>
                {[
                  "goleiro", "zagueiro-central", "lateral-direito", "lateral-esquerdo",
                  "volante", "primeiro-volante", "segundo-volante", "meia-central",
                  "meia-ofensivo", "meia-armador", "meia-atacante", "ponta-direita",
                  "ponta-esquerda", "atacante", "centroavante", "falso-9"
                ].map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>

            <h2 className="text-xl font-semibold text-[#3a5550] mt-6 mb-2">Físico</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <input type="number" placeholder="Idade Mínima" value={filtros.idadeMin} onChange={(e) => setFiltros({ ...filtros, idadeMin: e.target.value })} className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]" />
              <input type="number" placeholder="Idade Máxima" value={filtros.idadeMax} onChange={(e) => setFiltros({ ...filtros, idadeMax: e.target.value })} className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]" />
              <select value={filtros.perna} onChange={(e) => setFiltros({ ...filtros, perna: e.target.value })} className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]">
                <option value="">Todas as Pernas</option>
                <option value="direita">Direita</option>
                <option value="esquerda">Esquerda</option>
                <option value="ambas">Ambas</option>
              </select>
              <input type="number" placeholder="Altura Mín." value={filtros.alturaMin} onChange={(e) => setFiltros({ ...filtros, alturaMin: e.target.value })} className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]" />
              <input type="number" placeholder="Altura Máx." value={filtros.alturaMax} onChange={(e) => setFiltros({ ...filtros, alturaMax: e.target.value })} className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]" />
            </div>

            <h2 className="text-xl font-semibold text-[#3a5550] mt-6 mb-2">Mídia</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <select value={filtros.temVideo} onChange={(e) => setFiltros({ ...filtros, temVideo: e.target.value })} className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]">
                <option value="">Com ou sem vídeo</option>
                <option value="sim">Somente com vídeo</option>
              </select>
            </div>
          </>
        )}

        <div className="mb-10 flex flex-wrap gap-4 justify-center">
          <button onClick={aplicarFiltro} className="bg-[#f4ae31] text-white font-bold py-2 px-4 rounded hover:bg-[#e09e26] transition cursor-pointer">Aplicar Filtros</button>
          <button onClick={() => {
            setFiltros({ estado: '', cidade: '', posicao: '', perna: '', idadeMin: '', idadeMax: '', alturaMin: '', alturaMax: '', temVideo: '' });
            setResultados(jogadores);
          }} className="bg-gray-300 text-[#3a5550] font-bold py-2 px-4 rounded hover:bg-gray-400 transition cursor-pointer">Limpar Filtros</button>
        </div>

        {/* Lista de jogadores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {resultados.map((jogador) => (
            <div key={jogador.id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm text-left text-[#3a5550] hover:shadow-md transition">
              {jogador.imagemUrl && (
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image src={jogador.imagemUrl} alt={`Imagem de ${jogador.nome}`} fill className="rounded-full object-cover" />
                </div>
              )}
              <h2 className="text-lg font-bold mb-2 flex items-center gap-1">
                {jogador.nome}
                {jogador.planoPremium && <span className="text-yellow-400 text-xl">★</span>}
              </h2>
              <p><strong>Idade:</strong> {jogador.idade}</p>
              <p><strong>Altura:</strong> {jogador.altura} m</p>
              <p><strong>Peso:</strong> {jogador.peso} kg</p>
              <p><strong>Posição:</strong> {jogador.posicao}</p>
              <p><strong>Perna:</strong> {jogador.perna}</p>
              <p><strong>Local:</strong> {jogador.cidade} - {jogador.estado}</p>
              <p><strong>WhatsApp:</strong> {jogador.whatsapp}</p>
              <div className="mt-4 flex justify-center">
                <Link href={`/jogador/${jogador.id}`}>
                  <button className="bg-[#3a5550] hover:bg-[#2e443f] text-white py-2 px-6 rounded-md font-semibold transition transform hover:scale-105 cursor-pointer">
                    Saiba Mais
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
