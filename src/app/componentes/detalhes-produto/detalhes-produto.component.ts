import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconeService } from 'src/app/services/icone.service';
import { CardHomeService } from '../card-home.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  constructor(
    private iconeService: IconeService,
    private route: ActivatedRoute,
    private service: CardHomeService
  ) {}

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get("codigo");
    //this.service.buscarPorId(codigo).subscribe(); fazer ainda
    //this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
  }

  getIcone(icone: string) {
    return this.iconeService.getIcone(icone);
  }

}
