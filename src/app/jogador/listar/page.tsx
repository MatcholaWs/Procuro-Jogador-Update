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
  altura: number;
  peso: number;
  posicao: string;
  perna: string;
  cidade: string;
  estado: string;
  whatsapp: string;
  videos: string[];
  imagemUrl?: string;
  planoPremium?: boolean;
}

export default function ListarJogadoresPage() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);

  useEffect(() => {
    const buscarJogadores = async () => {
      const snap = await getDocs(collection(db, 'jogadores'));
      const lista = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Jogador[];

      // Prioriza jogadores com planoPremium === true
      const ordenados = [...lista].sort((a, b) => (b.planoPremium ? 1 : 0) - (a.planoPremium ? 1 : 0));

      setJogadores(ordenados);
    };

    buscarJogadores();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10 pt-28">
        <h1 className="text-3xl font-bold text-[#3a5550] mb-10 text-center">
          Jogadores Cadastrados
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {jogadores.map((jogador) => (
            <div
              key={jogador.id}
              className="bg-white p-6 rounded-lg shadow-md text-[#3a5550] text-left flex flex-col items-center"
            >
              {jogador.imagemUrl && (
                <div className="relative w-28 h-28 mb-4">
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

              <h2 className="text-lg font-bold text-left w-full flex items-center gap-1">
                {jogador.nome}
                {jogador.planoPremium && (
                  <span title="Plano Premium" className="text-yellow-400 text-xl">★</span>
                )}
              </h2>

              <div className="mt-2 text-sm w-full">
                <p><i className="bx bx-calendar"></i> <strong>Idade:</strong> {jogador.idade || '-'}</p>
                <p><i className="bx bx-ruler"></i> <strong>Altura:</strong> {jogador.altura || '-'}</p>
                <p><i className="bx bx-dumbbell"></i> <strong>Peso:</strong> {jogador.peso || '-'}</p>
                <p><i className="bx bx-football"></i> <strong>Posição:</strong> {jogador.posicao || '-'}</p>
                <p><i className="bx bx-walk"></i> <strong>Perna dominante:</strong> {jogador.perna || '-'}</p>
                <p><i className="bx bx-map"></i> <strong>Localização:</strong> {jogador.cidade}, {jogador.estado}</p>
              </div>

              <Link href={`/jogador/${jogador.id}`}>
                <button className="mt-4 bg-[#3a5550] hover:bg-[#2e443f] text-white py-2 px-6 rounded-md font-semibold transition transform hover:scale-105 cursor-pointer">
                  Saiba Mais
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
