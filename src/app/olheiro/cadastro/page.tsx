'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CadastroOlheiro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [plano, setPlano] = useState<'gratuito' | 'premium'>('gratuito'); // plano selecionado
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      await setDoc(doc(db, 'olheiros', cred.user.uid), {
        nome,
        email,
        whatsapp,
        criadoEm: serverTimestamp(),
        planoPremium: plano === 'premium',
      });

      localStorage.setItem('tipoUsuario', 'olheiro');
      router.push('/olheiro/procurar');
    } catch (err) {
      console.error('Erro ao cadastrar olheiro:', err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-[#3a5550]">Cadastro de Olheiro</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#3a5550]">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a5550]/60 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a5550]/60 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550]">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a5550]/60 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550]">WhatsApp</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
                maxLength={11}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a5550]/60 text-gray-800"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#3a5550]">Tipo de Plano</label>
              <select
                value={plano}
                onChange={(e) => setPlano(e.target.value as 'gratuito' | 'premium')}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a5550]/60 text-gray-800"
              >
                <option value="gratuito">Gratuito</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-[#3a5550] text-white py-2 rounded-md font-semibold hover:bg-[#2e443f] transition"
          >
            Cadastrar
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
