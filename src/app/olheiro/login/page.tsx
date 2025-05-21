'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginOlheiro() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      const cred = await signInWithEmailAndPassword(auth, email, senha);
      const uid = cred.user.uid;

      const olheiroDoc = await getDoc(doc(db, 'olheiros', uid));

      if (olheiroDoc.exists()) {
        router.push('/olheiro/procurar');
      } else {
        setErro('Usuário não é olheiro.');
      }
    } catch (err: any) {
      setErro('Email ou senha inválidos.');
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-20">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-200"
        >
          <h1 className="text-2xl font-bold mb-2 text-center text-[#3a5550]">Login de Olheiro</h1>
          <p className="text-sm text-center text-gray-600 mb-6">
            Use o e-mail e senha criados no cadastro de olheiro
          </p>

          <label className="block text-sm font-medium mb-1 text-[#3a5550]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a5550]/60 text-gray-800"
            placeholder="seu@email.com"
            required
          />

          <label className="block text-sm font-medium mb-1 text-[#3a5550]">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a5550]/60 text-gray-800"
            placeholder="********"
            required
          />

          {erro && <p className="text-red-500 text-sm mb-3">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-[#3a5550] text-white py-2 rounded-md font-semibold hover:bg-[#2e443f] transition cursor-pointer"
          >
            Entrar
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Ainda não tem conta?{' '}
            <a href="/olheiro/cadastro" className="text-[#f4ae31] hover:underline">
              Cadastre-se
            </a>
          </p>
        </form>
      </main>

      <Footer />
    </>
  );}
