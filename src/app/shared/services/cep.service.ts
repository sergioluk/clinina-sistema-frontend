import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string; // cidade
  uf: string;
  erro?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CepService {

   private readonly baseUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscar(cep: string): Observable<ViaCepResponse> {
    cep = cep.replace(/\D/g, ''); // Remove não digitos
    return this.http.get<ViaCepResponse>(`${this.baseUrl}/${cep}/json`);
  }
}
