export interface Agendamento {
  id?: number;
  animalId: number;
  data: string;           // formato: 'yyyy-MM-dd'
  horaEntrada: string;    // formato: 'HH:mm'
  horaSaida?: string;     // formato: 'HH:mm' (opcional)
  tipo: string; // "AVULSO" ou "PACOTE"
  status: string; // "PRE_AGENDADO", "ENCAIXE", "ATENDENDO", "PRONTO"
  descricao: string;
  observacoes: string;
  servicosIds: number[];
}
