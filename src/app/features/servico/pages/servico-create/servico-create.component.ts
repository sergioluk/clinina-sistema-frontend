import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicoService } from '../../services/servico.service';
import { Servico } from 'src/app/core/models/servico.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-servico-create',
  templateUrl: './servico-create.component.html',
  styleUrls: ['./servico-create.component.css']
})
export class ServicoCreateComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  @Input() servicoId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicoService: ServicoService,
    @Optional() public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: [0, Validators.required],
      categoria: ['banho', Validators.required]
    });

    //editar pela rota
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.servicoService.buscarPorId(+id).subscribe(service => {
        this.form.patchValue(service);
      });
    }
    //editar pelo modal
    if (this.servicoId) {
      this.isEditMode = true;
      this.servicoService.buscarPorId(this.servicoId).subscribe((servico) => {
        this.form.patchValue(servico);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const servico: Servico = this.form.value;

    if (this.isEditMode) {
      const id = +this.route.snapshot.paramMap.get("id")!;
      if (id) { //por rota
        this.servicoService.atualizar(id, servico).subscribe(() => {
          alert("Serviço atualizado com sucesso!");
          //this.router.navigate(["/banho-e-tosa/servicos"]);
          this.activeModal.close({ salvo: true });
        });
      } else if (this.servicoId) { //por modal
          this.servicoService.atualizar(this.servicoId, servico).subscribe(() => {
            alert("Serviço atualizado com sucesso!");
            this.activeModal?.close({ salvo: true });
          });
        }
    } else {
      this.servicoService.criar(servico).subscribe(() => {
        alert("Serviço criado com sucesso!");
        //this.router.navigate(["/banho-e-tosa/servicos"]);
        this.activeModal.close({ salvo: true });
      });
    }
  }

  limparCampo(campo: string): void {
    this.form.get(campo)?.setValue('');
  }

}
