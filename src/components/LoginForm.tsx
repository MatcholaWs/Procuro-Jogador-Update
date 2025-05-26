'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import NavBar from './Navbar';

interface Props {
  redirectTo: string;
  userType: 'jogador' | 'olheiro';
}

export default function LoginForm({ redirectTo, userType }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push(redirectTo);
    } catch (err: any) {
      setErro('Email ou senha inválidos');
      console.error(err.message);
    }
  };

  return (
    <>
      <NavBar />
      <main className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80">
          <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Entrar
          </button>

          <p className="mt-4 text-sm text-center text-gray-600">
            Ainda não tem conta?{' '}
            <a
              href={`/${userType}/cadastro`}
              className="text-blue-600 hover:underline font-medium"
            >
              Cadastre-se
            </a>
          </p>
        </form>
      </main>
    </>
  );
}
