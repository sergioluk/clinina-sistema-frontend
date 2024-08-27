import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutoComponent } from './componentes/cadastro-produto/cadastro-produto.component';
import { VendaComponent } from './componentes/venda/venda.component';
import { RelatorioComponent } from './componentes/relatorio/relatorio.component';
import { RelatorioFiadoComponent } from './componentes/relatorio-fiado/relatorio-fiado.component';
import { EstoqueComponent } from './componentes/estoque/estoque.component';
import { MensagensComponent } from './componentes/mensagens/mensagens.component';
import { DetalhesProdutoComponent } from './componentes/detalhes-produto/detalhes-produto.component';
import { CaixaComponent } from './componentes/caixa/caixa.component';
import { CadastroBanhoETosaComponent } from './componentes/banho-e-tosa/cadastro-banho-e-tosa/cadastro-banho-e-tosa.component';
import { BanhoETosaComponent } from './componentes/banho-e-tosa/banho-e-tosa.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
    path: 'mensagens',
    component: MensagensComponent
  },
  {
    path: 'caixa',
    component: CaixaComponent
  },
  {
    path: 'detalhes-produto/:codigo',
    component: DetalhesProdutoComponent
  },
  {
    path: 'estoque',
    component: EstoqueComponent
  },
  {
    path: 'banho-e-tosa',
    component: BanhoETosaComponent
  },
  {
    path: 'cadastrar-tutor',
    component: CadastroBanhoETosaComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login' // Ou redirecione para uma página de erro como PageNotFoundComponent
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
