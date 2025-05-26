'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
import 'boxicons/css/boxicons.min.css';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [logado, setLogado] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<'jogador' | 'olheiro' | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLogado(true);
        const uid = user.uid;

        const jogadorSnap = await getDoc(doc(db, 'jogadores', uid));
        if (jogadorSnap.exists()) {
          setNomeUsuario(jogadorSnap.data().nome);
          setTipoUsuario('jogador');
          return;
        }

        const olheiroSnap = await getDoc(doc(db, 'olheiros', uid));
        if (olheiroSnap.exists()) {
          setNomeUsuario(olheiroSnap.data().nome);
          setTipoUsuario('olheiro');
          return;
        }

        setNomeUsuario('Usuário');
        setTipoUsuario(null);
      } else {
        setLogado(false);
        setNomeUsuario('');
        setTipoUsuario(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setLogado(false);
    setNomeUsuario('');
    setTipoUsuario(null);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <Link href="/" className={styles.logoImage}>
          <Image
            src="/images/logo.png"
            alt="Logo Procuro Jogador"
            width={85}
            height={85}
            className={styles.logoImage}
          />
        </Link>
      </div>

      <div className={styles.centerSection}>
        <Link href="/" className={styles.navLink}>Principal</Link>
        {tipoUsuario === 'olheiro' ? (
          <Link href="/olheiro/procurar" className={styles.navLink}>Procurar Talentos</Link>
        ) : (
          <Link href="/jogador/listar" className={styles.navLink}>Ver atletas</Link>
        )}
        <Link href="/sobre" className={styles.navLink}>Sobre nós</Link>
        <Link href="/planos" className={styles.navLink}>Planos</Link>
        <Link href="/contato" className={styles.navLink}>Contato</Link>
      </div>

      <div className={styles.rightSection}>
        {logado ? (
          <div className={styles.usuarioWrapper}>
            <div className={styles.usuario}>
              <span className={styles.navLink}>Bem-vindo, {nomeUsuario}</span>
              <div className={styles.menuSuspenso}>
                {tipoUsuario === 'jogador' && (
                  <Link href="/jogador/perfil" className={styles.menuItem}>Ver meu perfil</Link>
                )}
                <button
                  onClick={handleLogout}
                  className={styles.menuItem}
                  style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link href="/login" className={styles.navLink}>
            <i className="bx bx-user" style={{ marginRight: '0.3rem' }}></i> Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}
