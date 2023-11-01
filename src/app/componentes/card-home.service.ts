import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardHome } from './card-home/card-home';
import { CadastroProduto } from './cadastro-produto/cadastro-produto';

@Injectable({
  providedIn: 'root'
})
export class CardHomeService {

  private readonly API = 'http://localhost:8080/produtos'
  private readonly APII = 'http://localhost:3000/produtos'

  constructor(private http: HttpClient) { }

  listar(): Observable<CardHome[]>{
    return this.http.get<CardHome[]>(this.API);
  }

  criar(produto: CadastroProduto): Observable<CadastroProduto>{
    return this.http.post<CadastroProduto>(this.API, produto);
  }


}
