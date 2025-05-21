'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
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
  pernaDominante: string;
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
    pernaDominante: '',
    idadeMin: '',
    idadeMax: ''
  });

  const [resultados, setResultados] = useState<Jogador[]>([]);

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

    buscarJogadores();
  }, []);

  const aplicarFiltro = () => {
    const filtrados = jogadores.filter((j) => {
      const dentroIdadeMin = filtros.idadeMin ? j.idade >= Number(filtros.idadeMin) : true;
      const dentroIdadeMax = filtros.idadeMax ? j.idade <= Number(filtros.idadeMax) : true;
      const mesmaPosicao = filtros.posicao ? j.posicao === filtros.posicao : true;
      const mesmoEstado = filtros.estado ? j.estado === filtros.estado : true;
      const mesmaPerna = filtros.pernaDominante ? j.pernaDominante === filtros.pernaDominante : true;

      return dentroIdadeMin && dentroIdadeMax && mesmaPosicao && mesmoEstado && mesmaPerna;
    });

    const ordenados = filtrados.sort((a, b) => (b.planoPremium ? 1 : 0) - (a.planoPremium ? 1 : 0));
    setResultados(ordenados);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 pt-28">
        <h1 className="text-3xl font-bold text-[#3a5550] mb-8 text-center">Procurar Talentos</h1>

        {/* Filtros */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <select
            name="posicao"
            value={filtros.posicao}
            onChange={(e) => setFiltros({ ...filtros, posicao: e.target.value })}
            className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]"
          >
            <option value="">Posição</option>
            {["goleiro", "zagueiro-central", "lateral-direito", "lateral-esquerdo", "volante", "primeiro-volante", "segundo-volante", "meia-central", "meia-ofensivo", "meia-armador", "meia-atacante", "ponta-direita", "ponta-esquerda", "atacante", "centroavante", "falso-9"].map((pos) => (
              <option key={pos} value={pos}>{pos.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>
            ))}
          </select>

          <select
            name="estado"
            value={filtros.estado}
            onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
            className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]"
          >
            <option value="">Estado (UF)</option>
            {estadosUF.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>

          <select
            name="pernaDominante"
            value={filtros.pernaDominante}
            onChange={(e) => setFiltros({ ...filtros, pernaDominante: e.target.value })}
            className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]"
          >
            <option value="">Perna</option>
            <option value="direita">Direita</option>
            <option value="esquerda">Esquerda</option>
            <option value="ambas">Ambas</option>
          </select>

          <input
            type="number"
            placeholder="Idade Mínima"
            value={filtros.idadeMin}
            onChange={(e) => setFiltros({ ...filtros, idadeMin: e.target.value })}
            className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]"
          />

          <input
            type="number"
            placeholder="Idade Máxima"
            value={filtros.idadeMax}
            onChange={(e) => setFiltros({ ...filtros, idadeMax: e.target.value })}
            className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-[#3a5550] focus:outline-none focus:ring-2 focus:ring-[#f4ae31]"
          />
        </div>

        <div className="mb-10 flex justify-center">
          <button
            onClick={aplicarFiltro}
            className="bg-[#f4ae31] text-white font-bold py-2 px-4 rounded hover:bg-[#e09e26] transition cursor-pointer"
          >
            Aplicar Filtros
          </button>
        </div>

        {/* Lista de jogadores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {resultados.map((jogador) => (
            <div
              key={jogador.id}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm text-left text-[#3a5550] hover:shadow-md transition"
            >
              {jogador.imagemUrl && (
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={
                      jogador.imagemUrl.startsWith('http') || jogador.imagemUrl.startsWith('/')
                        ? jogador.imagemUrl
                        : `/${jogador.imagemUrl}`
                    }
                    alt={`Imagem de ${jogador.nome}`}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}

              <h2 className="text-lg font-bold mb-2 flex items-center gap-1">
                {jogador.nome || 'Sem nome'}
                {jogador.planoPremium && (
                  <span title="Jogador Premium" className="text-yellow-400 text-xl">★</span>
                )}
              </h2>

              <p><i className="bx bx-calendar"></i> <strong>Idade:</strong> {jogador.idade || '-'}</p>
              <p><i className="bx bx-ruler"></i> <strong>Altura:</strong> {jogador.altura || '-'} m</p>
              <p><i className="bx bx-dumbbell"></i> <strong>Peso:</strong> {jogador.peso || '-'} kg</p>
              <p><i className="bx bx-football"></i> <strong>Posição:</strong> {jogador.posicao || '-'}</p>
              <p><i className="bx bx-walk"></i> <strong>Perna boa:</strong> {jogador.pernaDominante || '-'}</p>
              <p><i className="bx bx-map"></i> <strong>Local:</strong> {jogador.cidade} - {jogador.estado}</p>
              <p><i className="bx bxl-whatsapp"></i> <strong>WhatsApp:</strong> {jogador.whatsapp || '-'}</p>

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
