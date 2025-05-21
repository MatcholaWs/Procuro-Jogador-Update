'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { getJogadores } from '@/utils/getJogadores';
import styles from '@/components/VerTodosButton.module.css';
import Image from 'next/image';

export default function Home() {
  const [jogadores, setJogadores] = useState<any[]>([]);

  useEffect(() => {
    const fetchJogadores = async () => {
      const data = await getJogadores();
      const destacadosPrimeiro = data
        .map((doc: any) => ({ id: doc.id, ...doc }))
        .sort((a, b) => {
          const aScore = (a.destaque ? 2 : 0) + (a.planoPremium ? 1 : 0);
          const bScore = (b.destaque ? 2 : 0) + (b.planoPremium ? 1 : 0);
          return bScore - aScore;
        })
        .slice(0, 3); // pega os 3 melhores

      setJogadores(destacadosPrimeiro);
    };

    fetchJogadores();
  }, []);

  return (
    <div className="relative min-h-screen text-white bg-white">
      <Navbar />
      <Hero />

      <section className="bg-white py-16 px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-[#3a5550]">
          Jogadores em Destaque
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {jogadores.map((jogador, index) => (
            <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 text-[#3a5550] text-left flex flex-col"
        >
          <div className="relative w-24 h-24 mb-4 mx-auto">
            <Image
              src={
                jogador.imagemUrl?.startsWith('http') || jogador.imagemUrl?.startsWith('/')
                  ? jogador.imagemUrl
                  : `/${jogador.imagemUrl || 'jogador1.jpg'}`
              }
              alt={`Imagem de ${jogador.nome}`}
              fill
              className="rounded-full object-cover"
            />
          </div>

          <h2 className="text-lg font-bold flex items-center gap-1">
            {jogador.nome || 'Sem nome'}
            {jogador.planoPremium && (
              <span title="Jogador Premium" className="text-yellow-400 text-xl">★</span>
            )}
          </h2>

          <p><i className="bx bx-calendar"></i> <strong>Idade:</strong> {jogador.idade}</p>
          <p><i className="bx bx-ruler"></i> <strong>Altura:</strong> {jogador.altura} m</p>
          <p><i className="bx bx-dumbbell"></i> <strong>Peso:</strong> {jogador.peso} kg</p>
          <p><i className="bx bx-football"></i> <strong>Posição:</strong> {jogador.posicao}</p>
          <p><i className="bx bx-walk"></i> <strong>Perna dominante:</strong> {jogador.perna}</p>
          <p><i className="bx bx-map"></i> <strong>Localização:</strong> {jogador.cidade}, {jogador.estado}</p>

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

        <div className="text-center mt-6">
          <Link href="/jogador/listar" className={styles.botao}>
            Ver todos os Jogadores
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
