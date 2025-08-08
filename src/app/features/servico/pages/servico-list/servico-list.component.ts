import { Component, OnInit } from '@angular/core';
import { Servico } from 'src/app/core/models/servico.model';
import { ServicoService } from '../../services/servico.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { IconeService } from 'src/app/services/icone.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicoCreateComponent } from '../servico-create/servico-create.component';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']
})
export class ServicoListComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'descricao', 'preco', 'acoes'];
  servicos: Servico[] = [];
  dataSource = new MatTableDataSource(this.servicos);

  constructor(
    private servicoService: ServicoService,
    private router: Router,
    private icone: IconeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.carregarServicos();

  }

  carregarServicos(): void {
    this.servicoService.listar().subscribe(data => {
      this.servicos = data;
      this.dataSource.data = this.servicos;
    });
  }

  editar(id: number): void {
    //this.router.navigate(['banho-e-tosa/servicos/editar', id]);
    const modalRef = this.modalService.open(ServicoCreateComponent, { size: 'lg' });
    modalRef.componentInstance.servicoId = id;

    modalRef.closed.subscribe((resultado) => {
      if (resultado?.salvo) {
        this.carregarServicos(); // atualiza lista
      }
    });
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente excluir este serviço?')) {
      this.servicoService.excluir(id).subscribe(() => {
        alert('Serviço excluído com sucesso!');
        this.carregarServicos();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  novoServico() {
    const modalRef = this.modalService.open(ServicoCreateComponent, { size: 'lg' });

    modalRef.closed.subscribe(resultado => {
      if (resultado?.salvo) {
        this.carregarServicos();
      }
    });
  }

  getIconePorCategoria(categoria: string): IconProp {
    switch ((categoria || '').toLowerCase()) {
      case 'banho':
        return this.icone.getIcone('fa-shower');
      case 'tosa':
        return this.icone.getIcone('fa-scissors');
      case 'taxi':
        return this.icone.getIcone('fa-car');
      default:
        return this.icone.getIcone('fa-circle-question'); // ícone genérico
    }
  }

}
