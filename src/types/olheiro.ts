import { Timestamp } from 'firebase/firestore';

export interface Olheiro {
  nome: string;
  email: string;
  criadoEm: Timestamp;
}
