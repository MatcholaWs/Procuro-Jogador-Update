'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Jogador {
  nome: string;
  idade: number;
  altura: number;
  peso: number;
  posicao: string;
  perna: string;
  cidade: string;
  estado: string;
  whatsapp: string;
  imagemUrl?: string;
}

export default function ListarJogadoresPage() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);

  useEffect(() => {
    const buscarJogadores = async () => {
      const snapshot = await getDocs(collection(db, 'jogadores'));
      const lista = snapshot.docs.map(doc => doc.data() as Jogador);
      setJogadores(lista);
    };
    buscarJogadores();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3a5550]">
      <Navbar />

      <main className="flex-1 p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Jogadores Cadastrados</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jogadores.map((jogador, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-4 text-center flex flex-col items-center"
            >
              {jogador.imagemUrl ? (
                <img
                  src={jogador.imagemUrl}
                  alt={`Foto de ${jogador.nome}`}
                  className="w-32 h-32 object-cover rounded-full mb-4 border"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-4" />
              )}

              <h2 className="text-xl font-semibold mb-2">{jogador.nome}</h2>
              <p>Posição: {jogador.posicao}</p>
              <p>Perna: {jogador.perna}</p>
              <p>Cidade: {jogador.cidade} - {jogador.estado}</p>
              <p className="mt-1 text-sm text-gray-500">Altura: {jogador.altura}m • Peso: {jogador.peso}kg</p>
              <p className="mt-2 text-green-600 font-medium">WhatsApp: {jogador.whatsapp}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
