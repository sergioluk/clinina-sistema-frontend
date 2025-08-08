import { Servico } from "./servico.model";

export interface AgendamentoCalendario {
  id?: number;
  animalId: number;
  animalNome: string,
  tutorNome: string,
  sexo: string, //'Macho', 'Femea'
  especie: string, //CAO, GATO, OUTRO
  raca: string,
  tamanho: string,
  pelagem: string,
  foto: string,
  data: string;           // formato: 'yyyy-MM-dd'
  horaEntrada: string;    // formato: 'HH:mm'
  horaSaida?: string;     // formato: 'HH:mm' (opcional)
  status: string; // "PRE_AGENDADO", "ENCAIXE", "ATENDENDO", "PRONTO"
  tipo: string; // "AVULSO" ou "PACOTE"
  descricao: string;
  observacoes: string;
  servicos: Servico[];
}
