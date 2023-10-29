import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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



}
