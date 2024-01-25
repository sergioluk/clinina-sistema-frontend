import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardHome } from './card-home/card-home';
import { CadastroProduto, Venda, Vender } from './cadastro-produto/cadastro-produto';

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

  listar2(): Observable<CadastroProduto[]>{
    return this.http.get<CadastroProduto[]>(this.API);
  }

  pesquisarPorCodigoDeBarras(codigoDeBarras: string): Observable<Venda>{
    const url = `${this.API}/codigo-de-barras/${codigoDeBarras}`;
    return this.http.get<Venda>(url);
  }

  criar(produto: CadastroProduto): Observable<CadastroProduto>{
    return this.http.post<CadastroProduto>(this.API, produto);
  }

  excluir(id: number): Observable<CadastroProduto>{
    const url = `${this.API}/${id}`;
    return this.http.delete<CadastroProduto>(url);
  }

  buscarPorId(id: number): Observable<CadastroProduto>{
    const url = `${this.API}/${id}`;
    return this.http.get<CadastroProduto>(url);
  }

  editar(produto: CadastroProduto): Observable<CadastroProduto>{
    const url = `${this.API}/${produto.id}`;
    return this.http.put<CadastroProduto>(url, produto);
  }

  vender(produtos: Vender[]): Observable<Vender[]>{
    const url = "http://localhost:8080/vender";
    return this.http.post<Vender[]>(url, produtos);
  }

  aumentarEstoque(codigoDeBarras: string): Observable<Venda>{
    const url = `${this.API}/codigo-de-barras/editar/${codigoDeBarras}`;
    return this.http.get<Venda>(url);
  }

}
