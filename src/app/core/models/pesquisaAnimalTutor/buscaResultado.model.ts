import { AnimalDetalhado } from "./animalDetalhado.model";
import { TutorComAnimais } from "./tutorComAnimais.model";

export interface BuscaResultado {
  tutoresLista: TutorComAnimais[];
  animaisLista: AnimalDetalhado[];
}
