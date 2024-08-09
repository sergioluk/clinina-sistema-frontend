import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaId, Tutor } from 'src/app/interfaces/produtoVenda';
import { IconeService } from 'src/app/services/icone.service';
import { CardHomeService } from '../../card-home.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnviarTutorService } from 'src/app/services/enviar-tutor.service';

@Component({
  selector: 'app-cadastro-banho-e-tosa',
  templateUrl: './cadastro-banho-e-tosa.component.html',
  styleUrls: ['./cadastro-banho-e-tosa.component.css']
})
export class CadastroBanhoETosaComponent implements OnInit {

  formulario!: FormGroup;
  listaDeEstados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS',
    'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC',
    'SE', 'SP', 'TO'
  ];
  listaDeRacas: string[] = [
    "S.R.D",
    "Affenpinscher",
    "Afegão Hound",
    "Airedale Terrier",
    "Akita",
    "Akita Americano",
    "American Staffordshire Terrier",
    "Barbet",
    "Basenji",
    "Basset Artesiano Normando",
    "Basset Fulvo da Bretanha",
    "Basset Hound",
    "Beagle",
    "Beagle Harrier",
    "Bearded Collie",
    "Bedlington Terrier",
    "Bichon Bolonhês",
    "Bichon Frisé",
    "Bichon Havanês",
    "Bichon Maltês",
    "Biewer Terrier",
    "Billy",
    "Black and Tan Coonhound",
    "Bloodhound",
    "Bobtail",
    "Boiadeiro Australiano",
    "Boiadeiro Bernês",
    "Boiadeiro de Appenzell",
    "Boiadeiro de Entlebuch",
    "Boiadeiro de Flandres",
    "Border Collie",
    "Border Terrier",
    "Borzoi",
    "Boston Terrier",
    "Boxer",
    "Buldogue Campeiro",
    "Buldogue Francês",
    "Buldogue Inglês",
    "Bull Terrier",
    "Bulmastife",
    "Cairn Terrier",
    "Cane Corso",
    "Cão de Água Espanhol",
    "Cão de Crista Chinês",
    "Cão de Fila de São Miguel",
    "Cão de Montanha dos Pirenéus",
    "Cão de Santo Humberto",
    "Cão dos Pirinéus",
    "Cão Lobo Checoslovaco",
    "Cão Pelado do Peru",
    "Cão Pelado Mexicano",
    "Cão Pastor de Brie",
    "Cavalier King Charles Spaniel",
    "Chesapeake Bay Retriever",
    "Chihuahua",
    "Chow Chow",
    "Cocker Spaniel Americano",
    "Cocker Spaniel Inglês",
    "Collie",
    "Coton de Tulear",
    "Dachshund",
    "Dálmata",
    "Dandie Dinmont Terrier",
    "Doberman",
    "Dogo Argentino",
    "Dogue Alemão",
    "Dogue de Bordeaux",
    "Elkhound Norueguês",
    "Epagneul Breton",
    "Epagneul Francês",
    "Epagneul Picard",
    "Fox Terrier",
    "Galgo Espanhol",
    "Galgo Irlandês",
    "Golden Retriever",
    "Grande Boiadeiro Suiço",
    "Greyhound",
    "Grifo da Bélgica",
    "Husky Siberiano",
    "Jack Russell Terrier",
    "Labrador Retriever",
    "Lhasa Apso",
    "Malamute do Alasca",
    "Maltês",
    "Mastife",
    "Mastim Napolitano",
    "Mastim Tibetano",
    "Norfolk Terrier",
    "Norwich Terrier",
    "Papillon",
    "Pastor Alemão",
    "Pastor Australiano",
    "Pastor Belga",
    "Pastor de Shetland",
    "Pastor Maremano Abruzês",
    "Pequinês",
    "Perdigueiro Português",
    "Pinscher",
    "Pit Bull Terrier",
    "Pointer",
    "Poodle",
    "Pug",
    "Retriever do Labrador",
    "Rottweiler",
    "Samoieda",
    "São Bernardo",
    "Schipperke",
    "Schnauzer",
    "Setter Irlandês",
    "Shiba Inu",
    "Shih Tzu",
    "Silky Terrier",
    "Skye Terrier",
    "Spitz Alemão",
    "Spitz Finlandês",
    "Staffordshire Bull Terrier",
    "Terra Nova",
    "Terrier Brasileiro",
    "Terrier Escocês",
    "Terrier Irlandês",
    "Terrier Tibetano",
    "Vizsla",
    "Weimaraner",
    "Welsh Corgi",
    "West Highland White Terrier",
    "Whippet",
    "Yorkshire Terrier"
];
  listaDePelagem: string[] = ['Dupla Pelagem','Pelagem Curta','Pelagem Longa e Lisa','Pelagem Longa e Encaracolada','Pelagem Dura','Pelagens Peculiares'];

  loadingSpinner = false;
  modoEdicao = false;
  titulo = "Cadastrar";

  tutor: Tutor = {
    nome: '',
    cpf: '',
    telefone: '',
    celular: '',
    endereco: {
      cep: '',
      uf: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      complemento: ''
    },
    animais: [],
    email: ''
  }

  constructor(
    private icone: IconeService,
    private formBuilder: FormBuilder,
    private service: CardHomeService,
    private router: Router,
    private snackbar: SnackbarService,
    private enviarTutor: EnviarTutorService
  ){}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      nome: ['', Validators.compose([
        // Validators.required
      ])],
      cpf: [''],
      email: ['', Validators.compose([
        // Validators.required,
        // Validators.minLength(3),
        //Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      telefone: [''],
      celular: [''],
      endereco: this.formBuilder.group({
        cep: [''],
        uf: ['CE'],
        cidade: [''],
        bairro: [''],
        rua: [''],
        numero: [''],
        complemento: ['']
      }),
      animais: this.formBuilder.array([
        this.criarAnimalFormGroup()
      ])
      
    });

    //this.service.recuperarListaDeRacas().subscribe(lista => this.listaDeRacas = lista);

    //Parte do Alterar tutor
    let tutorRecebido = this.enviarTutor.getTutor();
    if (tutorRecebido != null || tutorRecebido != undefined) {
      this.modoEdicao = true;
      this.titulo = "Alterar";
      this.tutor = tutorRecebido;
      this.enviarTutor.clearTutor();
      this.setarTutorNoFormulario();
    }

  }

  setarTutorNoFormulario() {
    
    this.formulario.patchValue({
      nome: this.tutor.nome,
      cpf: this.tutor.cpf,
      email: this.tutor.email,
      telefone: this.tutor.telefone,
      celular: this.tutor.celular,
      endereco: {
        cep: this.tutor.endereco.cep,
        uf: this.tutor.endereco.uf,
        cidade: this.tutor.endereco.cidade,
        bairro: this.tutor.endereco.bairro,
        rua: this.tutor.endereco.rua,
        numero: this.tutor.endereco.numero,
        complemento: this.tutor.endereco.complemento
      }
    });

    // Limpar animais existentes no FormArray
    while (this.formArrayAnimais.length !== 0) {
      this.formArrayAnimais.removeAt(0);
    }

    // Preenche os animais no FormArray
    this.tutor.animais.forEach(animal => {
      this.formArrayAnimais.push(this.formBuilder.group({
        id: animal.id,
        nome: animal.nome,
        raca: animal.raca,
        cor: animal.cor,
        pelagem: animal.pelagem,
        dataDeNascimento: animal.dataDeNascimento ? new Date(animal.dataDeNascimento) : null,
        peso: animal.peso,
        obs: animal.obs,
        tutor: null
      }));
    });
    
  }

  get formArrayAnimais(): FormArray {
    return this.formulario.get('animais') as FormArray;
  }

  criarAnimalFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [],
      nome: [''],
      raca: ['S.R.D'],
      cor: [''],
      pelagem: ['Pelagem Curta'],
      dataDeNascimento: [''],
      peso: [''],
      obs: [''],
      tutor: [null]
    })
  }

  adicionarAnimal() {
    const animaisFormArray = this.formulario.get('animais') as FormArray;
    animaisFormArray.push(this.criarAnimalFormGroup());
  }

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  cadastrar() {
    
    if (!this.formulario.valid) {
      alert("Deu ruim");
      return;
    }
    //obter os dados do formulário
    const tutorData = this.formulario.value;

    tutorData.animais.forEach((animal: any) => {
      animal.tutor = {
        nome: tutorData.nome,
        cpf: tutorData.cpf,
        telefone: tutorData.telefone,
        celular: tutorData.celular,
        endereco: tutorData.endereco,
        animais: []
      };
    });

    this.loadingSpinner = true;
    if (this.modoEdicao) {
      //console.log(tutorData)
      this.alterarTutor(this.tutor.id, tutorData);
    } else {
      this.cadastrarTutor(tutorData);
    }
  
  }

  cadastrarTutor(tutorData: any) {
    this.service.cadastrarTutor(tutorData).subscribe({
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message);
        console.error("Código de status HTTP: ", error.status);
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
        this.loadingSpinner = false;
      },
      complete: () => {
        console.log("Requisição completa!!!");
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Cadastro concluído!!","Fechar");
        this.router.navigate(['/banho-e-tosa']);
      }
    });
  }

  alterarTutor(id: number | undefined, tutorData: any) {
    this.service.alterarTutor(id, tutorData).subscribe({
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message);
        console.error("Código de status HTTP: ", error.status);
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
        this.loadingSpinner = false;
      },
      complete: () => {
        console.log("Requisição completa!!!");
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Alterar Tutor concluído!!","Fechar");
        this.router.navigate(['/banho-e-tosa']);
      }
    });
  }
  cancelar() {
    this.router.navigate(['/banho-e-tosa']);
  }
}
