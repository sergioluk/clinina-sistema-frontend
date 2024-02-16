import { Component, OnInit } from '@angular/core';
import { CardHomeService } from '../card-home.service';
import { Fiado, RelatorioFiado } from '../cadastro-produto/cadastro-produto';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-relatorio-fiado',
  templateUrl: './relatorio-fiado.component.html',
  styleUrls: ['./relatorio-fiado.component.css']
})
export class RelatorioFiadoComponent implements OnInit {

  listaDeFiado: RelatorioFiado[] = [];
  modalEditar: boolean = false;
  indexProp: number = -1;
  formulario!: FormGroup;

  constructor(private service: CardHomeService,
    private formBuilder: FormBuilder){}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      situacao: [],
    })

    this.service.pegarListaDeFiado().subscribe((listaDeFiado) =>{
      this.listaDeFiado = listaDeFiado;
    });

  }

  verificarSeFoiFracionado(peso: string) {
    if(peso == '' || peso == null){
      return false;
    }
    return true;
  }

  pagou(valor: number){
    if (valor == 1){
      return 'Pago';
    }
    return 'Devendo';
  }

  abrirModal(index: number){
    this.modalEditar = true;
    this.indexProp = index;
  }

  editar(index: number){
    console.log("clicou")
    let fiado: Fiado = {
      id: this.listaDeFiado[index].id,
      pagou: this.formulario.get('situacao')?.value
    }
    if (fiado.pagou == this.listaDeFiado[index].pagou){
      this.fecharModalEditar();
    } else {
      this.service.editarFiado(fiado).subscribe(() => {
        window.location.reload();
      });
    }

  }


  fecharModalEditar(){
    this.modalEditar = false;
    this.indexProp = -1;
    this.formulario.get('situacao')?.setValue('');
  }

  mudarCorVerdeVermelho(n: number){
    if (n == 1) {
      return 'verde'
    }
    return 'vermelho'
  }

}
