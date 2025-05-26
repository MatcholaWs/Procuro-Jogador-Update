'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './Contato.module.css';

export default function ContatoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3a5550]">
      <Navbar />

      <main className={`flex-1 px-6 py-20 ${styles.container}`}>
        <h1 className={styles.title}>Contato</h1>

        <div className={styles.content}>
          {/* Coluna da Esquerda */}
          <div className={styles.info}>
            <h2>Fale Conosco</h2>
            <p><i className="bx bx-envelope"></i> contato@procurojogador.com</p>
            <p><i className="bx bxl-whatsapp"></i> (11) 90000-0000</p>

            <h3>Siga-nos nas Redes Sociais</h3>
            <div className={styles.social}>
              <i className="bx bxl-instagram"></i>
              <i className="bx bxl-tiktok"></i>
            </div>

            <p className={styles.ou}>Ou</p>

            <a
              href="https://wa.me/5511900000000"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
              Entre em contato pelo Whatsapp
            </a>
          </div>

          {/* Coluna da Direita */}
          <form className={styles.form}>
            <h2>Preencha o Formulário</h2>

            <label>Nome e Sobrenome *</label>
            <input type="text" placeholder="Nome e Sobrenome" required />

            <label>E-mail *</label>
            <input type="email" placeholder="E-mail" required />

            <label>Telefone *</label>
            <input type="tel" placeholder="Ex: (99) 99999-9999" required />

            <label>Mensagem *</label>
            <textarea placeholder="Digite sua mensagem" rows={4} required />

            <button type="submit">Enviar</button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
