import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroProduto, Categoria, Fiado, Fornecedor, Idade, Relatorio, RelatorioFiado, Sabor, Venda, Vender } from './cadastro-produto/cadastro-produto';
import { ProdutoVenda } from '../interfaces/produtoVenda';

@Injectable({
  providedIn: 'root'
})
export class CardHomeService {

  //private readonly API = 'https://clinina-backend.onrender.com'
  private readonly API = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  // listar(): Observable<CardHome[]>{
  //   return this.http.get<CardHome[]>(this.API);
  // }

  listar2(): Observable<CadastroProduto[]>{
    return this.http.get<CadastroProduto[]>(this.API);
  }

  pesquisarPorCodigoDeBarras(codigoDeBarras: string): Observable<HttpResponse<ProdutoVenda>>{
    const url = `${this.API}/produtos/codigo-de-barras/${codigoDeBarras}`;
    return this.http.get<ProdutoVenda>(url, {observe: 'response'});
  }

  criar(produto: CadastroProduto): Observable<CadastroProduto>{
    const url = `${this.API}/produtos`;
    return this.http.post<CadastroProduto>(url, produto);
  }

  excluir(id: number): Observable<CadastroProduto>{
    const url = `${this.API}/produtos/${id}`;
    return this.http.delete<CadastroProduto>(url);
  }

  buscarPorId(id: number): Observable<CadastroProduto>{
    const url = `${this.API}/produtos/${id}`;
    return this.http.get<CadastroProduto>(url);
  }

  editar(produto: CadastroProduto): Observable<CadastroProduto>{
    const url = `${this.API}/produtos/${produto.id}`;
    return this.http.put<CadastroProduto>(url, produto);
  }

  vender(produtos: Vender[]): Observable<HttpResponse<Vender[]>>{
    const url = `${this.API}/vender`;
    return this.http.post<Vender[]>(url, produtos, {observe: 'response'});
  }
  pesquisarPorNome(nome: string): Observable<HttpResponse<ProdutoVenda[]>>{
    const url = `${this.API}/vender/nome/${nome}`;
    return this.http.get<ProdutoVenda[]>(url, {observe: 'response'});
  }
  pesquisarPorCodigoDeBarrasOuNome(nome: string): Observable<HttpResponse<CadastroProduto[]>>{
    const url = `${this.API}/produtos/encontrar/${nome}`;
    return this.http.get<CadastroProduto[]>(url, {observe: 'response'});
  }

  aumentarEstoque(codigoDeBarras: string): Observable<Venda>{
    const url = `${this.API}/produtos/codigo-de-barras/editar/${codigoDeBarras}`;
    return this.http.get<Venda>(url);
  }

  pegarListaCategoria(): Observable<Categoria[]>{
    const url = this.API + "/produtos/listaCategoria";
    return this.http.get<Categoria[]>(url);
  }

  pegarListaSabor(): Observable<Sabor[]>{
    const url = this.API + "/produtos/listaSabor";
    return this.http.get<Sabor[]>(url);
  }

  pegarListaIdade(): Observable<Idade[]>{
    const url = this.API + "/produtos/listaIdade";
    return this.http.get<Idade[]>(url);
  }

  pegarListaFornecedor(): Observable<Fornecedor[]>{
    const url = this.API + "/produtos/listaFornecedor";
    return this.http.get<Fornecedor[]>(url);
  }

  adicionarCategoria(categoria: Categoria): Observable<Categoria>{
    const url = this.API + "/produtos/adicionarCategoria";
    return this.http.post<Categoria>(url, categoria);
  }

  adicionarIdade(idade: Idade): Observable<Idade>{
    const url = this.API + "/produtos/adicionarIdade";
    return this.http.post<Idade>(url, idade);
  }

  adicionarSabor(sabor: Sabor): Observable<Sabor>{
    const url = this.API + "/produtos/adicionarSabor";
    return this.http.post<Sabor>(url, sabor);
  }

  adicionarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor>{
    const url = this.API + "/produtos/adicionarFornecedor";
    return this.http.post<Fornecedor>(url, fornecedor);
  }

  pegarListaDeItensVendidos(data: {dia: number, mes: number, ano: number}): Observable<Relatorio[]>{
    const url = this.API + "/produtos/relatorio";

    // Criar os parâmetros da URL
    let params = new HttpParams()
      .set('dia', data.dia.toString())
      .set('mes', data.mes.toString())
      .set('ano', data.ano.toString());

    return this.http.get<Relatorio[]>(url, { params });
  }

  pegarListaDeFiado(): Observable<RelatorioFiado[]>{
    const url = this.API + "/produtos/relatorio-fiado";
    return this.http.get<RelatorioFiado[]>(url);
  }

  editarFiado(fiado: Fiado): Observable<Fiado> {
    const url = `${this.API}/produtos/editar-fiado/${fiado.id}`
    return this.http.put<Fiado>(url, fiado )
  }
  editarProduto(produto: CadastroProduto): Observable<CadastroProduto>{
    console.log(produto.produto);
    const url = `${this.API}/produtos/editarProduto/${produto.codigoDeBarras}`;
    return this.http.patch<CadastroProduto>(url, produto);
  }
  verificarCodigoDeBarras(codigoDeBarras: string): Observable<boolean>{
    const url = `${this.API}/produtos/verificarCodigoDeBarras/${codigoDeBarras}`;
    return this.http.get<boolean>(url);
  }
  pingar(): Observable<HttpResponse<{ message: string }>>{
    const url = this.API + "/produtos/ping";
    return this.http.get<{ message: string }>(url, { observe: 'response'});
  }

}
