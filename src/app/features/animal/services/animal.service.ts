import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/core/models/animal.model';
import { BuscaResultado } from 'src/app/core/models/pesquisaAnimalTutor/buscaResultado.model';
import { API_BASE_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private apiUrl = API_BASE_URL + '/banho-e-tosa/animais';

  constructor(private http: HttpClient) { }

  listar(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`);
  }

  criar(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, animal);
  }

  atualizar(id: number, animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiUrl}/${id}`, animal);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  pesquisar(termo: string): Observable<BuscaResultado> {
    const params = new HttpParams().set('q', termo);
    return this.http.get<BuscaResultado>(this.apiUrl + "/pesquisar", { params });
  }
}
