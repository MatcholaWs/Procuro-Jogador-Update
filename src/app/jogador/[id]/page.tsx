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
  planoPremium: boolean;
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

  const whatsappLink = `https://wa.me/${jogador.whatsapp.replace(/\D/g, '')}?text=Ol%C3%A1%2C%20vi%20seu%20perfil%20no%20Procuro%20Jogador%20e%20gostaria%20de%20conversar.`;

  return (
    <div className="min-h-screen bg-white text-[#3a5550]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        {jogador.imagemUrl && (
          <div className="w-full flex justify-center mb-6">
            <img
              src={jogador.imagemUrl}
              alt={`Foto de ${jogador.nome}`}
              className="w-40 h-40 object-cover rounded-full border-4 border-white shadow"
            />
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          {jogador.nome}
          {jogador.planoPremium && <span className="text-yellow-400 text-2xl">★</span>}
        </h2>

        <section className="bg-gray-50 border rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📏</span>
            <h3 className="font-semibold text-lg">Dados físicos</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-md shadow-sm p-4 flex flex-col items-center">
              <i className="bx bx-calendar text-3xl mb-2"></i>
              <p className="text-sm text-gray-600">Idade</p>
              <p className="font-bold text-base">{jogador.idade} anos</p>
            </div>
            <div className="bg-white rounded-md shadow-sm p-4 flex flex-col items-center">
              <i className="bx bx-ruler text-3xl mb-2"></i>
              <p className="text-sm text-gray-600">Altura</p>
              <p className="font-bold text-base">{jogador.altura} m</p>
            </div>
            <div className="bg-white rounded-md shadow-sm p-4 flex flex-col items-center">
              <i className="bx bx-dumbbell text-3xl mb-2"></i>
              <p className="text-sm text-gray-600">Peso</p>
              <p className="font-bold text-base">{jogador.peso} kg</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 border rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">⚽</span>
            <h3 className="font-semibold text-lg">Informações técnicas</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white rounded-md shadow-sm p-4 flex flex-col items-center">
              <i className="bx bx-football text-3xl mb-2"></i>
              <p className="text-sm text-gray-600">Posição</p>
              <p className="font-bold text-base">{jogador.posicao}</p>
            </div>
            <div className="bg-white rounded-md shadow-sm p-4 flex flex-col items-center">
              <i className="bx bx-walk text-3xl mb-2"></i>
              <p className="text-sm text-gray-600">Perna dominante</p>
              <p className="font-bold text-base">{jogador.perna}</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 border rounded-xl p-5 mb-10 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📍</span>
            <h3 className="font-semibold text-lg">Localização e contato</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="bg-white rounded-md shadow-sm p-4 flex flex-col items-center">
              <i className="bx bx-map text-3xl mb-2"></i>
              <p className="text-sm text-gray-600">Cidade</p>
              <p className="font-bold text-base">{jogador.cidade}, {jogador.estado}</p>
            </div>
            <div className="flex justify-center sm:justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition shadow"
              >
                <i className="bx bxl-whatsapp text-xl"></i>
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </section>

        <div>
          <h3 className="text-xl font-semibold mb-4">🎥 Vídeos</h3>
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
