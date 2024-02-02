import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardHomeService } from '../card-home.service';
import { Router } from '@angular/router';
import { Relatorio } from '../cadastro-produto/cadastro-produto';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  listaDeItensVendidos: Relatorio[] = [];
  total: number = 0;

  constructor(
    private service: CardHomeService,
    private router: Router
  ){}

  ngOnInit(): void {

      this.service.pegarListaDeItensVendidos().subscribe((listaDeItensVendidos) =>{
        this.listaDeItensVendidos = listaDeItensVendidos;
        console.log(this.listaDeItensVendidos[1].id)
        console.log(this.listaDeItensVendidos[1].produto)
        console.log(this.listaDeItensVendidos[2].id)
        console.log(this.listaDeItensVendidos[2].produto)
        console.log("nome: " + this.listaDeItensVendidos[0].produto)
        console.log("peso: " + this.listaDeItensVendidos[0].peso)
        this.calcularTotal();
      });

  }

  calcularTotal() {
    let soma = 0;
    for (let item of this.listaDeItensVendidos) {
      soma += item.precoTotal;
    }
    this.total = soma;
  }

  verificarSeFoiFracionado(peso: string) {
    if(peso == '' || peso == null){
      return false;
    }
    return true;
  }

  imprimirConteudo() {
    const conteudo = document.getElementById('conteudoParaImprimir')?.innerHTML;

    if (conteudo) {
      const janelaImpressao = window.open('', '_blank');
      //const janelaImpressao = window;
      janelaImpressao?.document.write('<html><head><title>Imprimir Conteúdo</title></head><body>');
      janelaImpressao?.document.write(conteudo);
      janelaImpressao?.document.write('</body></html>');
      janelaImpressao?.document.close();
      janelaImpressao?.print();
      /*
      // Cria uma instância do jsPDF
      const pdf = new jsPDF();
      // Adiciona o conteúdo ao PDF
      pdf.html(conteudo, {
        callback: (pdf) => {
          // Salva ou exibe o PDF
          pdf.save('relatorio.pdf');
        }
      });*/
    }
  }


}
