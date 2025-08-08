import { AnimalResumo } from "./animalResumo.model";

export interface TutorComAnimais {
  id: number;
  nome: string;
  cpf: string;
  celular: string;
  telefone: string;
  animais: AnimalResumo[];
}
