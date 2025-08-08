import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/core/models/cliente.model';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {
  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: [''],
      telefone: [''],
      celular: [''],
      email: [''],
      endereco: this.fb.group({
        cep: ['', Validators.required],
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        uf: ['', Validators.required],
        complemento: [''],
      }),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.clienteService.buscarPorId(+id).subscribe((cliente) => {
        this.form.patchValue(cliente.pessoa);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const id = this.route.snapshot.paramMap.get("id");

    const cliente: Cliente = {
      pessoa: this.form.value,
    };

    if (id) {
      this.clienteService.atualizar(+id, cliente).subscribe({
        next: () => {
          alert("Cliente atualizado com sucesso!");
          this.router.navigate(["/clientes2"]);
        },
        error: (err) => {
          console.error("Erro ao atualizar tutor:", err);
          alert("Erro ao atualizar cliente. Verifique os dados e tente novamente.");
        }
      });
    } else {
      this.clienteService.criar(cliente).subscribe({
        next: () => {
          alert("Cliente cadastrado com sucesso!");
          this.router.navigate(["/clientes2"]);
        },
        error: (err) => {
          console.error("Erro ao cadastrar tutor:", err);
          alert("Erro ao cadastrar cliente. Verifique os dados e tente novamente.");
        }
      });
    }
  }
}
