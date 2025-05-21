// src/components/VerTodosButton.tsx
import Link from 'next/link';
import styles from './VerTodosButton.module.css';

export default function VerTodosButton() {
  return (
    <div className="text-center mt-6">
      <Link href="/jogador/listar" className={styles.button}>
        Ver todos os Jogadores
      </Link>
    </div>
  );
}
