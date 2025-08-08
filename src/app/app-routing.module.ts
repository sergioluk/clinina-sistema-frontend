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
import { LancamentoComponent } from './componentes/lancamento/lancamento.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';

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
    path: 'lancamento',
    component: LancamentoComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'tutores',
    loadChildren: () =>
      import('./features/tutor/tutor.module').then((m) => m.TutorModule),
  },
  {
    path: 'animais',
    loadChildren: () =>
      import('./features/animal/animal.module').then((m) => m.AnimalModule),
  },
  {
    path: 'banho-e-tosa/agendamentos',
    loadChildren: () =>
      import('./features/agendamento/agendamento.module').then((m) => m.AgendamentoModule),
  },
  {
    path: 'banho-e-tosa/servicos',
    loadChildren: () =>
      import('./features/servico/servico.module').then((m) => m.ServicoModule),
  },
  {
    path: 'clientes2',
    loadChildren: () =>
      import('./features/cliente/cliente.module').then((m) => m.ClienteModule),
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
