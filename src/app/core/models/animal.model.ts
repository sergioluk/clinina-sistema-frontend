export interface Animal {
  id?: number;
  nome: string;
  especie: string;
  sexo: string;
  raca?: string;
  cor?: string;
  pelagem?: string;
  dataNascimento?: string;
  tamanho: string;
  castrado: boolean;
  observacoes?: string;
  foto?: string;
  tutorId: number;
  tutorNome: string;
}
