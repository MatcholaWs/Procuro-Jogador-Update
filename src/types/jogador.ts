import { Timestamp } from 'firebase/firestore';

export interface Jogador {
  nome: string;
  email: string;
  idade: number;
  altura: number;          // Ex: 1.83
  peso: number;            // Ex: 80
  posicao: string;         // Ex: "zagueiro"
  perna: string;           // Ex: "direita", "esquerda", "ambas"
  pais: string;            // Sempre "Brasil"
  estado: string;          // Ex: "SP"
  cidade: string;
  whatsapp: string;          // Ex: "São Paulo"
  videos: string[];        // Lista de links do YouTube
  planoPremium: boolean;   // false por padrão
  destaque: boolean;       // false por padrão
  criadoEm: Timestamp;     // Data do cadastro
}
