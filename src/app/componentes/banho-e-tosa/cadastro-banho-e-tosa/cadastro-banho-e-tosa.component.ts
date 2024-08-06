import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaId } from 'src/app/interfaces/produtoVenda';
import { IconeService } from 'src/app/services/icone.service';
import { CardHomeService } from '../../card-home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-banho-e-tosa',
  templateUrl: './cadastro-banho-e-tosa.component.html',
  styleUrls: ['./cadastro-banho-e-tosa.component.css']
})
export class CadastroBanhoETosaComponent implements OnInit {

  formulario!: FormGroup;
  listaDeEstados: any[] = ['Acre','Alagoas','Amapá','Amazonas','Bahia','Ceará','Espírito Santo','Goiás','Maranhão','Mato Grosso','Mato Grosso do Sul','Minas Gerais','Pará','Paraíba','Paraná','Pernambuco','Piauí','Rio de Janeiro','Rio Grande do Norte','Rio Grande do Sul','Rondônia','Roraima','Santa Catarina','São Paulo','Sergipe','Tocantins','Distrito Federal'];
  listaDeRacas: any[] = [];
  

  constructor(
    private icone: IconeService,
    private formBuilder: FormBuilder,
    private service: CardHomeService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      codigoDeBarras: ['', Validators.compose([
        // Validators.required
      ])],
      categoria: ['Ração'],
      produto: ['', Validators.compose([
        // Validators.required,
        // Validators.minLength(3),
        //Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      imagens: ['this.listaDeImagens'],
      sabor: ['Carne'],
      idade: ['Adulto'],
      preco: [],
      precoCompra: [''],
      peso: [1],
      desconto: [0],
      animal: ['Cachorro'],
      castrado: [0],
      porte: ['this.buildPortes()'],
      informacao: ['this.listaDeInformacao'],
      fornecedor: ['Sem fornecedor'],
      estoque: [1],
      imagemP: [''],
      lucro: []
    });

    this.service.recuperarListaDeRacas().subscribe(lista => this.listaDeRacas = lista);

  }

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  cadastrar() {

  }
  cancelar() {
    this.router.navigate(['/venda']);
  }
}
