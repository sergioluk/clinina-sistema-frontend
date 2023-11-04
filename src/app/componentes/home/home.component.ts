import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CardHome } from '../card-home/card-home';
import { CardHomeComponent } from '../card-home/card-home.component';
import { CardHomeService } from '../card-home.service';
import { CadastroProduto } from '../cadastro-produto/cadastro-produto';

@Component({
  selector: 'app-home',
  //standalone: true,
  //imports: [CommonModule, SlickCarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = [
    {img: "/assets/img/promocao.png"},
    {img: "/assets/img/promocao2.png"},
    {img: "/assets/img/promocao3.png"},
    {img: "/assets/img/promocao4.png"},
    {img: "/assets/img/promocao5.png"}
  ];

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "dots": true,
    "centerMode": true,
    "arrows": true,
   "centerPadding": '60px',
    "autoplaySpeed": 5000,
    "pauseOnHover": true,
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

  listaCards: CardHome[] = [];

  listaCards2: CadastroProduto[] = []

  constructor(private service: CardHomeService){}

  ngOnInit(): void {
    this.service.listar().subscribe((listaCards) =>{
      this.listaCards = listaCards
    })

    this.service.listar2().subscribe((listaCards2) =>{
      this.listaCards2 = listaCards2
    })
  }

}
