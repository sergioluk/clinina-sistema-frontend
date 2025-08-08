import { Component } from '@angular/core';
import { Cliente } from 'src/app/core/models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent {

  clientes: Cliente[] = [];

  constructor(
    private service: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.listar().subscribe((res) => (this.clientes = res));
  }

  editar(id: number): void {
    this.router.navigate(['/clientes2/editar', id]);
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.service.excluir(id).subscribe(() => {
        this.clientes = this.clientes.filter((c) => c.id !== id);
      });
    }
  }

}
