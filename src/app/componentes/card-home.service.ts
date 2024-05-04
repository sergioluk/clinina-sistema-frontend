import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardHome } from './card-home/card-home';
import { CadastroProduto, Categoria, Fiado, Fornecedor, Idade, Relatorio, RelatorioFiado, Sabor, Venda, Vender } from './cadastro-produto/cadastro-produto';
import { ProdutoVenda } from '../interfaces/produtoVenda';

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

  pesquisarPorCodigoDeBarras(codigoDeBarras: string): Observable<ProdutoVenda>{
    const url = `${this.API}/codigo-de-barras/${codigoDeBarras}`;
    return this.http.get<ProdutoVenda>(url);
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

  pegarListaCategoria(): Observable<Categoria[]>{
    const url = this.API + "/listaCategoria";
    return this.http.get<Categoria[]>(url);
  }

  pegarListaSabor(): Observable<Sabor[]>{
    const url = this.API + "/listaSabor";
    return this.http.get<Sabor[]>(url);
  }

  pegarListaIdade(): Observable<Idade[]>{
    const url = this.API + "/listaIdade";
    return this.http.get<Idade[]>(url);
  }

  pegarListaFornecedor(): Observable<Fornecedor[]>{
    const url = this.API + "/listaFornecedor";
    return this.http.get<Fornecedor[]>(url);
  }

  adicionarCategoria(categoria: Categoria): Observable<Categoria>{
    const url = this.API + "/adicionarCategoria";
    return this.http.post<Categoria>(url, categoria);
  }

  adicionarIdade(idade: Idade): Observable<Idade>{
    const url = this.API + "/adicionarIdade";
    return this.http.post<Idade>(url, idade);
  }

  adicionarSabor(sabor: Sabor): Observable<Sabor>{
    const url = this.API + "/adicionarSabor";
    return this.http.post<Sabor>(url, sabor);
  }

  adicionarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor>{
    const url = this.API + "/adicionarFornecedor";
    return this.http.post<Fornecedor>(url, fornecedor);
  }

  pegarListaDeItensVendidos(): Observable<Relatorio[]>{
    const url = this.API + "/relatorio";
    return this.http.get<Relatorio[]>(url);
  }

  pegarListaDeFiado(): Observable<RelatorioFiado[]>{
    const url = this.API + "/relatorio-fiado";
    return this.http.get<RelatorioFiado[]>(url);
  }

  editarFiado(fiado: Fiado): Observable<Fiado> {
    const url = `${this.API}/editar-fiado/${fiado.id}`
    return this.http.put<Fiado>(url, fiado )
  }

}
