import styles from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link'; // ⬅️ Import necessário

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={`${styles.column} ${styles.logoColumn}`}>
          <Image
            src="/images/logo.png"
            alt="Logo Procuro Jogador"
            width={120}
            height={120}
            className={styles.footerLogo}
          />
          <p className={styles.description}>Encontre o talento certo <br></br> para o seu time!</p>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.column}>
          <h4 className={styles.sectionTitle}>Navegação</h4>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link href="/">Principal</Link></li>
            <li className={styles.navItem}><Link href="/jogador/listar">Ver Atletas</Link></li>
            <li className={styles.navItem}><Link href="/sobre">Sobre Nós</Link></li>
            <li className={styles.navItem}><Link href="/planos">Planos</Link></li>
            <li className={styles.navItem}><Link href="/contato">Contato</Link></li> {/* NOVO */}
          </ul>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.column}>
          <h4 className={styles.sectionTitle}>Contato</h4>
          <p>Email: contato@procurojogador.com</p>
          <p>Tel: (11) 99999-9999</p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© 2025 Procuro Jogador – Todos os direitos reservados</p>
      </div>
    </footer>
  );
}
