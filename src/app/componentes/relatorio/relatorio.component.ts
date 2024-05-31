import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CardHomeService } from '../card-home.service';
import { Router } from '@angular/router';
import { Relatorio } from '../cadastro-produto/cadastro-produto';
import jsPDF from 'jspdf';
import { IconeService } from 'src/app/services/icone.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  formulario!: FormGroup;
  listaDeItensVendidos: Relatorio[] = [];
  total: number = 0;

  constructor(
    private service: CardHomeService,
    private router: Router,
    private icone: IconeService,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ){}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      data1: new Date()
    });

    const data = this.getData();

    this.service.pegarListaDeItensVendidos(data).subscribe((listaDeItensVendidos) =>{
      this.listaDeItensVendidos = listaDeItensVendidos;
      this.calcularTotal();
    });

    //Pra fazer o Input de data ficar no formato brasileiro
    this._locale = 'pt-br';
    this._adapter.setLocale(this._locale);

  }

  getData() {
    const dia = this.formulario.get("data1")?.value.getDate();
    const mes = this.formulario.get("data1")?.value.getMonth() + 1;
    const ano = this.formulario.get("data1")?.value.getFullYear();

    const data = {
      dia: dia,
      mes: mes,
      ano: ano
    }
    return data;
  }

  atualizar() {
    const data = this.getData();

    this.service.pegarListaDeItensVendidos(data).subscribe((listaDeItensVendidos) =>{
      this.listaDeItensVendidos = listaDeItensVendidos;
      this.calcularTotal();
    });

  }

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  handleImageError(event: any) {
    event.target.src = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
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
