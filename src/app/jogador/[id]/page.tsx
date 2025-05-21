'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
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
  imagemUrl: string;
  videos?: string[] | string;
}

export default function PerfilJogadorPage() {
  const { id } = useParams();
  const [jogador, setJogador] = useState<Jogador | null>(null);

  useEffect(() => {
    const buscarJogador = async () => {
      const ref = doc(db, 'jogadores', id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setJogador(snap.data() as Jogador);
      }
    };

    if (id) buscarJogador();
  }, [id]);

  if (!jogador) return <p className="text-center py-10">Carregando jogador...</p>;

  const videosArray = Array.isArray(jogador.videos)
    ? jogador.videos
    : jogador.videos
    ? [jogador.videos]
    : [];

  return (
    <div className="min-h-screen bg-white text-[#3a5550]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        {/* Imagem no topo, centralizada */}
        {jogador.imagemUrl && (
          <div className="w-full flex justify-center mb-6">
            <img
              src={jogador.imagemUrl}
              alt={`Foto de ${jogador.nome}`}
              className="w-40 h-40 object-cover rounded-full"
            />
          </div>
        )}

        {/* Informações alinhadas à esquerda */}
        <h2 className="text-2xl font-bold mb-4 text-center">{jogador.nome}</h2>
        <div className="space-y-2 text-sm sm:text-base">
          <p><i className="bx bx-calendar"></i> <strong>Idade:</strong> {jogador.idade} anos</p>
          <p><i className="bx bx-ruler"></i> <strong>Altura:</strong> {jogador.altura} m</p>
          <p><i className="bx bx-dumbbell"></i> <strong>Peso:</strong> {jogador.peso} kg</p>
          <p><i className="bx bx-football"></i> <strong>Posição:</strong> {jogador.posicao}</p>
          <p><i className="bx bx-walk"></i> <strong>Perna dominante:</strong> {jogador.perna}</p>
          <p><i className="bx bx-map"></i> <strong>Localização:</strong> {jogador.cidade}, {jogador.estado}</p>
          <p><i className="bx bxl-whatsapp"></i> <strong>WhatsApp:</strong> {jogador.whatsapp}</p>
        </div>

        {/* Seção de vídeos */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Vídeos</h3>
          {videosArray.length > 0 ? (
            videosArray.map((video: string, index: number) => {
              let videoId = '';
              if (video.includes('watch?v=')) {
                videoId = video.split('watch?v=')[1].split('&')[0];
              } else if (video.includes('youtu.be/')) {
                videoId = video.split('youtu.be/')[1].split('?')[0];
              } else {
                videoId = video;
              }

              return (
                <div key={index} className="my-6 aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`Vídeo ${index + 1}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500">Nenhum vídeo cadastrado.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
