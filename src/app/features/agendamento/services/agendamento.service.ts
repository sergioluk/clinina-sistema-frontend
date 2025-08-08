import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agendamento } from 'src/app/core/models/agendamento.modal';
import { AgendamentoCalendario } from 'src/app/core/models/agendamentoCalendario.model';
import { API_BASE_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private apiUrl = API_BASE_URL + '/banho-e-tosa/agendamentos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.apiUrl}/${id}`);
  }

  criar(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.apiUrl, agendamento);
  }

  atualizar(id: number, agendamento: Agendamento): Observable<Agendamento> {
    return this.http.put<Agendamento>(`${this.apiUrl}/${id}`, agendamento);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

   listarParaCalendario(): Observable<AgendamentoCalendario[]> {
    return this.http.get<AgendamentoCalendario[]>(this.apiUrl + "/calendario");
  }

}
