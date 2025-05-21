'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function PlanosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3a5550]">
      <Navbar />

      <main className="flex-1">
        <section className={`${styles.container} py-50 px-6`}>
          <h1 className="text-3xl font-bold text-center mb-12 text-[#3a5550]">
            Escolha o Plano Ideal para Você
          </h1>

          <div className={styles.cardGroup}>
            <div className={styles.card}>
              <div className="flex justify-center mb-4">
                <Image src="/icons/free.png" alt="Plano Gratuito" width={200} height={200} />
              </div>
              <h2 className={styles.titulo}>Plano Gratuito</h2>
              <p className={`${styles.descricao} ${styles.textPadrao}`}>
                Ideal para começar. Crie seu perfil, adicione dados básicos e esteja visível para olheiros.
              </p>
              <p className={styles.preco}>R$ 0,00</p>
              <button className={styles.botao}>Comece Agora</button>
            </div>

            <div className={`${styles.card} ${styles.destacado}`}>
              <div className="flex justify-center mb-4">
                <Image src="/icons/player-premium.png" alt="Plano Premium Jogador" width={200} height={200} />
              </div>
              <h2 className={styles.titulo}>Jogador Premium</h2>
              <p className={`${styles.descricao} ${styles.textPadrao}`}>
                Ganhe destaque, adicione vídeos, estatísticas e apareça nas buscas personalizadas dos olheiros.
              </p>
              <p className={styles.preco}>R$ 39,90/mês</p>
              <a href="https://mpago.la/21Zj42c" target="_blank" rel="noopener noreferrer">
                <button className={styles.botao}>Seja Premium</button>
              </a>
            </div>

            <div className={styles.card}>
              <div className="flex justify-center mb-4">
                <Image src="/icons/olheiro-premium.png" alt="Plano Olheiro Premium" width={200} height={200} />
              </div>
              <h2 className={styles.titulo}>Olheiro Premium</h2>
              <p className={`${styles.descricao} ${styles.textPadrao}`}>
                Acesse relatórios completos, salve jogadores favoritos e entre em contato diretamente.
              </p>
              <p className={styles.preco}>R$ 39,90/mês</p>
              <a href="https://mpago.la/21Zj42c" target="_blank" rel="noopener noreferrer">
                <button className={styles.botao}>Seja Premium</button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
