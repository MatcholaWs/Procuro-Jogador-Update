'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Diferenciais from '@/components/Diferenciais';

export default function SobreNosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3a5550]">
      <Navbar />

      <main className="flex-1 pt-50 px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Sobre Nós</h1>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 mb-16">
          <div className="md:w-1/2 text-center md:text-left text-lg leading-relaxed">
            <p>
              O <strong>"Procuro Jogador"</strong> nasceu com o objetivo de facilitar o encontro entre talentos escondidos
              e oportunidades reais no futebol. Aqui, a tecnologia impulsiona sonhos, conectando atletas e olheiros de forma
              simples, confiável e eficiente.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/sobre-nos.png"
              alt="Foto institucional sobre nós"
              width={600}
              height={400}
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>

        <Diferenciais />
      </main>

      <Footer />
    </div>
  );
}
