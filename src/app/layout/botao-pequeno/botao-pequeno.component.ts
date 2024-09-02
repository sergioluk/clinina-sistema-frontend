import { Component, Input, OnInit } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-botao-pequeno',
  templateUrl: './botao-pequeno.component.html',
  styleUrls: ['./botao-pequeno.component.css']
})
export class BotaoPequenoComponent implements OnInit{

  @Input() texto : string | undefined;
  @Input() cor : string | undefined;
  @Input() icone! :string;

  borda = "none";
  corTexto = "var(--corBranco)"
  mostrarIcone = true;

  constructor(private iconeService: IconeService) {}
  
  ngOnInit(): void {
    if (this.cor == undefined || this.cor == null) {
      this.cor = "transparent";
      this.borda = "1px solid var(--corPrincipal)";
      this.corTexto = "var(--corTexto)";
    }
    if (this.icone == undefined || this.icone == null) {
      this.mostrarIcone = false;
    }
  }

  getIcone() {
    return this.iconeService.getIcone(this.icone);
  }

}
