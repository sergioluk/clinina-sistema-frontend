import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-nota-fiscal',
  templateUrl: './nota-fiscal.component.html',
  styleUrls: ['./nota-fiscal.component.css']
})
export class NotaFiscalComponent {

  @Output() visivel = new EventEmitter();

  @ViewChild('notaFiscal', {static: false}) notaFiscal!: ElementRef;
  listaVenda = [];

  toggleJanela(){
    this.setVisivel();
  }
  setVisivel() {
    this.visivel.emit();
  }

  gerarPDF() {
    const element = this.notaFiscal.nativeElement;

    html2canvas(element, {scale: 2}).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      //Definir margens
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

      //Salvar o PDF
      pdf.save('nota-fiscal.pdf');
    });
  }
}
