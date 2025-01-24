import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroProduto, Categoria, Fiado, Fornecedor, Idade, Mensagem, Relatorio, RelatorioDTO, RelatorioFiado, Sabor, Venda, Vender } from './cadastro-produto/cadastro-produto';
import { CadastrarLancamento, Caixa, CaixaCompleto, CategoriasLancamentos, DetalhesProduto, LinhaDoTempo, ListaLancamento, Login, PaginaLancamentos, ProdutoVenda, Tutor } from '../interfaces/produtoVenda';

@Injectable({
  providedIn: 'root'
})
export class CardHomeService {

  private readonly API = 'https://clinina-backend.onrender.com';
  //private readonly API = 'http://localhost:8080';

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
  cadastrarFiado(produtos: Vender[]): Observable<HttpResponse<Vender[]>>{
    const url = `${this.API}/produtos/cadastrarFiado`;
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

  // pegarListaDeItensVendidos(data:
  //   {start_dia: number, start_mes: number, start_ano: number,
  //     end_dia: number, end_mes: number, end_ano: number}): Observable<HttpResponse<Relatorio[]>>{
  //   const url = this.API + "/produtos/relatorio";

  //   // Criar os parâmetros da URL
  //   let params = new HttpParams()
  //     .set('start_dia', data.start_dia.toString())
  //     .set('start_mes', data.start_mes.toString())
  //     .set('start_ano', data.start_ano.toString())
  //     .set('end_dia', data.end_dia.toString())
  //     .set('end_mes', data.end_mes.toString())
  //     .set('end_ano', data.end_ano.toString());

  //   return this.http.get<Relatorio[]>(url, { params, observe: 'response' });
  // }

  pegarListaDeItensVendidos(data:
    {start_dia: number, start_mes: number, start_ano: number,
      end_dia: number, end_mes: number, end_ano: number}): Observable<HttpResponse<RelatorioDTO>>{
    const url = this.API + "/produtos/relatorio";

    // Criar os parâmetros da URL
    let params = new HttpParams()
      .set('start_dia', data.start_dia.toString())
      .set('start_mes', data.start_mes.toString())
      .set('start_ano', data.start_ano.toString())
      .set('end_dia', data.end_dia.toString())
      .set('end_mes', data.end_mes.toString())
      .set('end_ano', data.end_ano.toString());

    return this.http.get<RelatorioDTO>(url, { params, observe: 'response' });
  }

  pegarListaDeFiado(): Observable<HttpResponse<RelatorioFiado[]>>{
    const url = this.API + "/produtos/relatorio-fiado";
    return this.http.get<RelatorioFiado[]>(url, {observe: 'response'});
  }

  editarFiado(fiado: Fiado): Observable<HttpResponse<Fiado>> {
    const url = `${this.API}/produtos/editar-fiado/${fiado.id}`
    return this.http.put<Fiado>(url, fiado, {observe: 'response'} )
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

  listarMensagens(estado: string): Observable<HttpResponse<Mensagem[]>>{
    const url = this.API + "/mensagens";
    let params = new HttpParams().set('estado',estado);
    return this.http.get<Mensagem[]>(url, {params , observe: 'response'});
  }
  salvarMensagem(mensagem: Mensagem): Observable<HttpResponse<Mensagem>>{
    const url = `${this.API}/mensagens`;
    return this.http.post<Mensagem>(url, mensagem, {observe: 'response'});
  }
  editarMensagemVisto(mensagem: Mensagem): Observable<HttpResponse<Mensagem>>{
    const url = `${this.API}/mensagens/editarMensagemVisto/${mensagem.id}`;
    return this.http.patch<Mensagem>(url, mensagem, {observe: 'response'});
  }
  apagarMensagem(mensagem: Mensagem): Observable<HttpResponse<Mensagem>>{
    const url = `${this.API}/mensagens/apagarMensagem/${mensagem.id}`;
    return this.http.patch<Mensagem>(url, mensagem, {observe: 'response'});
  }
  buscarProdutoDetalhes(codigoDeBarras: string): Observable<HttpResponse<DetalhesProduto>> {
    const url = `${this.API}/produtos/detalhes-produto/${codigoDeBarras}`;
    let params = new HttpParams().set("codigoDeBarras", codigoDeBarras);

    return this.http.get<DetalhesProduto>(url, { params, observe: 'response' });
  }

  buscarListaLinhaDoTempo(produtoAndValor:{ codigoDeBarras: string, valor: string }): Observable<HttpResponse<LinhaDoTempo[]>> {
    const url = `${this.API}/produtos/detalhes-produto/linhaDoTempo`;
    let params = new HttpParams()
    .set('codigoDeBarras', produtoAndValor.codigoDeBarras)
    .set('valor', produtoAndValor.valor);

    return this.http.get<LinhaDoTempo[]>(url, {params , observe: 'response'});
  }
  buscarCaixa( data: {start_dia: number, start_mes: number, start_ano: number}): Observable<HttpResponse<CaixaCompleto>> {
    const url = `${this.API}/caixa/buscarCaixa`;
    const params = new HttpParams()
    .set('dia', data.start_dia.toString())
    .set('mes', data.start_mes.toString())
    .set('ano', data.start_ano.toString())

    return this.http.get<CaixaCompleto>(url, {params, observe: 'response'} )
  }
  fecharCaixa(caixa: Caixa): Observable<HttpResponse<Caixa>>{
    const url = `${this.API}/caixa/fecharCaixa`;
    return this.http.put<Caixa>(url, caixa, {observe: 'response'});
  }
  abrirCaixa(caixa: Caixa): Observable<HttpResponse<Caixa>>{
    const url = `${this.API}/caixa/abrirCaixa`;
    return this.http.post<Caixa>(url, caixa, {observe: 'response'});
  }
  cadastrarTutor(tutorData: Tutor): Observable<HttpResponse<Tutor>>{
    const url = `${this.API}/banho-e-tosa/tutor`;
    return this.http.post<Tutor>(url, tutorData, {observe: 'response'});
  }
  pegarListaDeTutores(): Observable<HttpResponse<Tutor[]>>{
    const url = this.API + "/banho-e-tosa/tutor";
    return this.http.get<Tutor[]>(url, {observe: 'response'});
  }
  alterarTutor(id: number | undefined, tutorData: Tutor): Observable<HttpResponse<Tutor>>{
    const url = `${this.API}/banho-e-tosa/tutor/${id}`;
    return this.http.put<Tutor>(url, tutorData, {observe: 'response'});
  }
  abrirCaixaSeFechado(id: number): Observable<HttpResponse<any>> {
    const url = `${this.API}/caixa/${id}/abrirSeFechado`;
    return this.http.patch<any>(url, {observe: 'response'});
  }
  logar(login: Login): Observable<HttpResponse<Login>> {
    const url = `${this.API}/login`;
    const params = new HttpParams()
    .set('usuario', login.usuario)
    .set('senha', login.senha);

    return this.http.get<Login>(url, { params: params, observe: 'response' });
  }
  pegarCategorias(): Observable<HttpResponse<CategoriasLancamentos>>{
    const url = this.API + "/lancamentos/categorias";
    return this.http.get<CategoriasLancamentos>(url, {observe: 'response'});
  }
  cadastrarLancamento(lancamento: CadastrarLancamento): Observable<HttpResponse<CadastrarLancamento[]>>{
    const url = `${this.API}/lancamentos`;
    return this.http.post<CadastrarLancamento[]>(url, lancamento, {observe: 'response'});
  }
  getListaLancamentos(data: {dataInicio: string, dataFim: string}): Observable<HttpResponse<PaginaLancamentos>>{
    const url = this.API + "/lancamentos/lista";
    const params = new HttpParams()
    .set('dataInicio', data.dataInicio)
    .set('dataFim', data.dataFim)
    return this.http.get<PaginaLancamentos>(url, {params, observe: 'response'});
  }

  // recuperarListaDeRacas() {
  //   const apiKey = "";
  //   const url ="https://api.thedogapi.com/v1/breeds";
  //   return this.http.get<any[]>(url, {
  //     headers: {
  //       'x-api-key': apiKey
  //     }
  //   });
  // }

}
