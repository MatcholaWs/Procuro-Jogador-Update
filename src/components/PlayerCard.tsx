import Image from 'next/image';
import styles from './PlayerCard.module.css';

interface PlayerCardProps {
  nome: string;
  idade: number | string;
  altura: string;
  peso: string;
  posicao: string;
  pernaDominante: string;
  cidade: string;
  estado: string;
  imagemUrl: string;
}

export default function PlayerCard({
  nome,
  idade,
  altura,
  peso,
  posicao,
  pernaDominante,
  cidade,
  estado,
  imagemUrl,
}: PlayerCardProps) {
  const isRemoteImage = imagemUrl?.startsWith('http') || imagemUrl?.startsWith('data:image');
  
  return (
    <div className={styles.card}>
      <div className={styles.imagemWrapper}>
        {imagemUrl && isRemoteImage && (
          <img
            src={imagemUrl}
            alt={`Imagem do jogador ${nome}`}
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
              borderRadius: '50%',
              display: 'block',
              margin: '0 auto 16px',
            }}
          />
        )}
      </div>

      <div className={styles.info}>
        <strong className={styles.nome}>{nome}</strong>
        <p><i className="bx bx-calendar"></i> <strong>Idade:</strong> {idade || '-'}</p>
        <p><i className="bx bx-ruler"></i> <strong>Altura:</strong> {altura || '-'}</p>
        <p><i className="bx bx-dumbbell"></i> <strong>Peso:</strong> {peso || '-'}</p>
        <p><i className="bx bx-football"></i> <strong>Posição:</strong> {posicao || '-'}</p>
        <p><i className="bx bx-walk"></i> <strong>Perna dominante:</strong> {pernaDominante || '-'}</p>
        <p><i className="bx bx-map"></i> <strong>Localização:</strong> {cidade}, {estado}</p>
      </div>

      <button className={styles.botao}>Saiba Mais</button>
    </div>
  );
}
