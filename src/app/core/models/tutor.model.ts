export interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  complemento?: string;
}

export interface Pessoa {
  nome: string;
  cpf: string;
  telefone: string;
  celular: string;
  email: string;
  endereco: Endereco;
}

export interface Tutor {
  id?: number;
  pessoa: Pessoa;
}
