import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from 'src/app/core/models/servico.model';
import { API_BASE_URL } from 'src/app/shared/constants';


@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private readonly api = API_BASE_URL + '/banho-e-tosa/servicos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.api);
  }

  buscarPorId(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.api}/${id}`);
  }

  criar(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(this.api, servico);
  }

  atualizar(id: number, servico: Servico): Observable<Servico> {
    return this.http.put<Servico>(`${this.api}/${id}`, servico);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
