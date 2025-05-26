'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import 'boxicons/css/boxicons.min.css';
import Link from 'next/link';

interface Jogador {
  nome: string;
  email: string;
  idade: number;
  altura: string;
  peso: string;
  posicao: string;
  perna: string;
  cidade: string;
  estado: string;
  whatsapp: string;
  imagemUrl?: string;
}

export default function PerfilJogador() {
  const [dados, setDados] = useState<Jogador | null>(null);

  useEffect(() => {
    const buscarDados = async () => {
      const usuario = auth.currentUser;
      if (!usuario) return;

      const docRef = doc(db, 'jogadores', usuario.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setDados(snap.data() as Jogador);
      }
    };

    buscarDados();
  }, []);

  if (!dados) return null;

  return (
    <>
      <Navbar />

       <main className="min-h-screen pt-28 bg-gray-50 text-[#3a5550] flex flex-col items-center px-4">
        {dados.imagemUrl && (
          <div className="w-32 h-32 relative mb-4">
            <Image
              src={dados.imagemUrl}
              alt="Foto do jogador"
              fill
              className="rounded-full object-cover border-4 border-white shadow"
            />
          </div>
        )}

        <h1 className="text-2xl font-bold mb-6">{dados.nome}</h1>

        <div className="text-sm space-y-2 text-left">
          <p><i className="bx bx-envelope mr-2"></i><strong>Email:</strong> {dados.email}</p>
          <p><i className="bx bx-calendar mr-2"></i><strong>Idade:</strong> {dados.idade} anos</p>
          <p><i className="bx bx-ruler mr-2"></i><strong>Altura:</strong> {dados.altura} m</p>
          <p><i className="bx bx-dumbbell mr-2"></i><strong>Peso:</strong> {dados.peso} kg</p>
          <p><i className="bx bx-football mr-2"></i><strong>Posição:</strong> {dados.posicao}</p>
          <p><i className="bx bx-walk mr-2"></i><strong>Perna dominante:</strong> {dados.perna}</p>
          <p><i className="bx bx-map mr-2"></i><strong>Localização:</strong> {dados.cidade}, {dados.estado}</p>
          <p><i className="bx bxl-whatsapp mr-2"></i><strong>WhatsApp:</strong> {dados.whatsapp}</p>
        </div>

        <Link href="/jogador/editar">
          <button className="mt-6 bg-[#3a5550] hover:bg-[#2e443f] text-white px-6 py-2 rounded-md font-semibold transition transform hover:scale-105 cursor-pointer">
            Editar perfil
          </button>
        </Link>
      </main>

      <Footer />
    </>
  );
}
