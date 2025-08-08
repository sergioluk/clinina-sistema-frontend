import { Component, OnInit } from '@angular/core';
import { Tutor } from 'src/app/core/models/tutor.model';
import { TutorService } from '../../services/tutor.service';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent implements OnInit{

  tutores: Tutor[] = [];

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {
    this.tutorService.listar().subscribe((dados) => {
      this.tutores = dados;
    })
  }

  deletarTutor(id: number) {
  if (confirm('Tem certeza que deseja excluir este tutor?')) {
    this.tutorService.excluir(id).subscribe(() => {
      this.tutores = this.tutores.filter(t => t.id !== id);
    });
  }
}

}
