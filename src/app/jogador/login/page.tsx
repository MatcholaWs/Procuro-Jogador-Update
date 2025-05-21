
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function JogadorLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push('/jogador/perfil');
    } catch (err: any) {
      setErro('Email ou senha inválidos.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-200"
        >
          <h1 className="text-2xl font-bold mb-2 text-center text-[#3a5550]">Login de Jogador</h1>
          <p className="text-sm text-center text-gray-600 mb-6">
            Use seu e-mail e senha para acessar sua conta
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
            <a
              href="/jogador/cadastro"
              className="text-[#f4ae31] hover:underline font-semibold"
            >
              Cadastre-se
            </a>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}
