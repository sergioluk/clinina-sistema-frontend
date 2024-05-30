import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutoComponent } from './componentes/cadastro-produto/cadastro-produto.component';
import { VendaComponent } from './componentes/venda/venda.component';
import { RelatorioComponent } from './componentes/relatorio/relatorio.component';
import { RelatorioFiadoComponent } from './componentes/relatorio-fiado/relatorio-fiado.component';
import { EstoqueComponent } from './componentes/estoque/estoque.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'venda',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  {
    path: 'cadastrarProduto',
    component: CadastroProdutoComponent
  },
  // {
  //   path: 'home/produto/:id',
  //   component: ProdutoComponent
  // },
  {
    path: 'venda',
    component: VendaComponent
  },
  {
    path: 'relatorio',
    component: RelatorioComponent
  },
  {
    path: 'fiado',
    component: RelatorioFiadoComponent
  },
  {
    path: 'estoque',
    component: EstoqueComponent
  }
  /*
  {
    path: 'criarPensamento',
    component: CriarPensamentoComponent
  },
  {
    path: 'pensamentos/excluirPensamento/:id',
    component: ExcluirPensamentoComponent
  },
  {
    path: 'pensamentos/editarPensamento/:id',
    component: EditarPensamentoComponent
  }
  */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
