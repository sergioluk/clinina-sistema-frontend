import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from 'src/app/core/models/tutor.model';
import { API_BASE_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  private baseUrl = API_BASE_URL + "/banho-e-tosa/tutor";

  constructor(private http: HttpClient) { }

  listar(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.baseUrl);
  }

  criar(tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(this.baseUrl, tutor);
  }

  atualizar(id: number, tutor: Tutor): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.baseUrl}/${id}`, tutor);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  buscarPorId(id: number): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.baseUrl}/${id}`);
  }

}
