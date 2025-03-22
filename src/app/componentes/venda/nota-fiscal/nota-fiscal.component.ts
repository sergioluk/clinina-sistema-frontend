import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NotaFiscal } from 'src/app/interfaces/produtoVenda';

@Component({
  selector: 'app-nota-fiscal',
  templateUrl: './nota-fiscal.component.html',
  styleUrls: ['./nota-fiscal.component.css']
})
export class NotaFiscalComponent {

  @Input() notaFiscalDados!: NotaFiscal;
  @Output() visivel = new EventEmitter();

  @ViewChild('notaFiscal', {static: false}) notaFiscal!: ElementRef;

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
      //pdf.save('nota-fiscal.pdf');

      // **Adiciona o comando de impressão automática**
      pdf.autoPrint();

      // **Abre o PDF diretamente para impressão**
      window.open(pdf.output('bloburl'), '_blank');
    });

  }

  imprimirNotaFiscal() {
    let nota = "";
    nota += "Clinina\n";
    nota += "Rua Natal, 1116, Henrique Jorge, Fortaleza-CE\n";
    nota += "--------------------------------------\n";
    nota += "Venda: " + this.notaFiscalDados.id + "\n";
    nota += "--------------------------------------\n";
    nota += "Itens:\n";

    this.notaFiscalDados.listaDeProdutos.forEach((item, index) => {
      let linha = `${index + 1} ${item.produto} ${item.quantidade}x R$${item.preco.toFixed(2)}\n`;

      nota += linha;
    });

    nota += "--------------------------------------\n";
    nota += "Quantidade de itens: " + this.notaFiscalDados.listaDeProdutos.length + "\n";
    nota += "Desconto: R$" + this.getDescontoTotal().toFixed(2) + "\n";
    nota += "Valor Total: R$" + this.getValorTotal().toFixed(2) + "\n";
    nota += "Forma de Pagamento: " + this.notaFiscalDados.formaPagamento +"\n";
    nota += "--------------------------------------\n";
    nota += "Consumidor: " + this.notaFiscalDados.cliente.nome + " " + this.notaFiscalDados.cliente.telefone + "\n";
    nota += "--------------------------------------\n";
    nota += "Obrigado pela preferência!\n";

    // Abre a janela de impressão com o conteúdo formatado
    /*const win = window.open('', '', 'width=250,height=400');
    if (win) {
      win.document.write('<pre>' + nota + '</pre>');
      win.document.close();
      win.print();
    }*/
    // Criar um documento temporário para impressão

     // 📌 Definir largura e altura da janela de impressão
    const largura = 350; // Largura ideal para impressão térmica
    const alturaDinamica = 200 + this.notaFiscalDados.listaDeProdutos.length * 10;
    // 📌 Calcular a posição para abrir no centro da tela
    const esquerda = (window.screen.width - largura) / 2;
    const topo = (window.screen.height - alturaDinamica) / 2;

    // 📌 Abrir a janela centralizada
    const printWindow = window.open('', '', `width=${largura},height=${alturaDinamica},top=${topo},left=${esquerda}`);

  //const printWindow = window.open('', '', 'width=250,height=400');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Nota Fiscal</title>
            <style>
              @media print {
              @page { margin: 0; size: auto; height: fit-content; padding: 10px; } /* Remove margens e ajusta tamanho ao conteúdo */
              body { margin: 0; padding: 10px; font-family: monospace; }
              pre { font-size: 8px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; }
            }
            </style>
          </head>
          <body>
            <pre>${nota}</pre>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(() => window.close(), 1000);
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }


  getDescontoTotal() {
    let soma = 0;
    for (let item of this.notaFiscalDados.listaDeProdutos ) {
      soma += item.desconto
    }
    return soma;

  }

  getValorTotal() {
    let soma = 0;
    for (let item of this.notaFiscalDados.listaDeProdutos ) {
      soma += (item.quantidade * item.preco);
    }
    return soma;
  }
}
