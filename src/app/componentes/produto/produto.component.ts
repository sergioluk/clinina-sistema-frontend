import { Component, OnInit } from '@angular/core';
import { CadastroProduto } from '../cadastro-produto/cadastro-produto';
import { CardHomeService } from '../card-home.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit{

  produto: CadastroProduto = {
    id: 0,
    produto: '',
    sabor: '',
    idade: '',
    categoria: '',
    animal: '',
    informacao: '',
    peso: 0,
    preco: 0,
    desconto: 0,
    estoque: 0,
    venda: 0,
    castrado: 0,
    fornecedor: '',
    litros: '',
    imagemP: '',
    imagens: ''
  }


  constructor(
    private service: CardHomeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}






  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id')
      this.service.buscarPorId(parseInt(id!)).subscribe((produto) =>{
        this.produto = produto;
        this.listaInformacao(produto.informacao);
    });

  }


  informacaoArray: Array<string> = []

  listaInformacao(descricao: string){
    this.informacaoArray = descricao.split(":");
  }

}

