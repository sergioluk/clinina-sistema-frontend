import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { CadastroProdutoComponent } from './componentes/cadastro-produto/cadastro-produto.component';
import { ProdutoComponent } from './componentes/produto/produto.component';
import { VendaComponent } from './componentes/venda/venda.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cadastrarProduto',
    component: CadastroProdutoComponent
  },
  {
    path: 'home/produto/:id',
    component: ProdutoComponent
  },
  {
    path: 'venda',
    component: VendaComponent
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
