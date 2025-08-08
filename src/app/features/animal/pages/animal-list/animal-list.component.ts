import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/core/models/animal.model';
import { AnimalService } from '../../services/animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

  animais: Animal[] = [];

  constructor(
    private animalService: AnimalService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.animalService.listar().subscribe(animais => this.animais = animais);
  }

  editar(id: number): void {
    this.router.navigate(['/animais/editar', id]);
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este animal?')) {
      this.animalService.excluir(id).subscribe(() => {
        this.animais = this.animais.filter(a => a.id !== id);
      });
    }
  }

}
