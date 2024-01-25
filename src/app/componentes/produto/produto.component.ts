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

  itemClicked() {
    if (this.active == true){
      this.active = false;
    } else {
      this.active = true;
    }

  }

  detalhesClicked(){
    if (this.detalhesDoProduto == true){
      this.detalhesDoProduto = false;
    } else {
      this.detalhesDoProduto = true;
    }
  }

  detalhesDoProduto: boolean = true;
  active: boolean = true;

  produto: CadastroProduto = {
    id: 0,
    codigoDeBarras: '',
    produto: '',
    sabor: '',
    idade: '',
    categoria: '',
    animal: '',
    informacao: [],
    peso: '',
    preco: 0,
    desconto: 0,
    estoque: 0,
    castrado: false,
    fornecedor: '',
    imagens: [],
    porte: '',
    imagemP: ''
  }

  slides = [{'img':''}];

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "autoplay": false,
    "dots": false,
    "centerMode": false,
    "arrows": true,
    "centerPadding": '0px',
    "autoplaySpeed": 5000,
    "pauseOnHover": true,
    "asNavFor": '.carousel-cardImagem',
    "infinite": true,
    "responsive":[
      {
        "breakpoint": 992,
        "settings":{
          "arrows":true,
          "infinite":true,
          "slidesToShow": 3,
          "slidesToScroll": 3
        }
      },
      {
        "breakpoint": 768,
        "settings":{
          "arrows":true,
          "infinite":true,
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      }
    ]

  };


  slideConfig2 = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "arrows": false,
    "fade": true,
    "asNavFor": '.carousel-produto'
  };

  slideConfig3 = {
    "infinite": true,
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "arrows": true
  };

  constructor(
    private service: CardHomeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}






  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id')
      this.service.buscarPorId(parseInt(id!)).subscribe((produto) =>{
        this.produto = produto;
        //this.listaInformacao(produto.informacao); tirei os dois so pra compilar, vou ter que refazer esse sistema mais tarde...
        //this.listaUrl(produto.imagens);
        this.adicionarImgsNoSlide(this.fotosCarroselArray.length);
        for(let i = 0; i < this.slides.length; i++){
          this.slides[i].img = this.fotosCarroselArray[i];
        }
    });

  }


  informacaoArray: Array<string> = []
  fotosCarroselArray: Array<string> = []

  listaInformacao(descricao: string){
    this.informacaoArray = descricao.split(":");
  }

  listaUrl(urls: string){
    this.fotosCarroselArray = urls.split(":@:");
  }

  //so coloca a quantidade certa de objetos com a propriedade img em slides
  adicionarImgsNoSlide(num : number) {
    this.slides = [];
    var obj;

    for (var i = 0; i < num; i++) {
      obj = {'img':''};
      this.slides.push(obj);
    }

    return this.slides;
  }

}

