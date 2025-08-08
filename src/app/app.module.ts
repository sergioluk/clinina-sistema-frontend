import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {  registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CadastroProdutoComponent } from './componentes/cadastro-produto/cadastro-produto.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MensagemErroComponent } from './componentes/mensagem-erro/mensagem-erro.component';
import {MatSelectModule} from '@angular/material/select';
import { VendaComponent } from './componentes/venda/venda.component';
import { RelatorioComponent } from './componentes/relatorio/relatorio.component';
import { RelatorioFiadoComponent } from './componentes/relatorio-fiado/relatorio-fiado.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfoComponent } from './layout/info/info.component';
import { BotaoGrandeComponent } from './layout/botao-grande/botao-grande.component';
import { ContainerImageComponent } from './layout/container-image/container-image.component';
import { MenuOpcaoComponent } from './layout/menu-opcao/menu-opcao.component';
//import { InputSimplesComponent } from './layout/input-simples/input-simples.component';
import { TabelaVendaComponent } from './componentes/venda/tabela-venda/tabela-venda.component';
import { JanelaComponent } from './layout/janela/janela.component';
import { InputComponent } from './form/input/input.component';

import { EditarDescQtdComponent } from './componentes/venda/editar-desc-qtd/editar-desc-qtd.component';
import { CancelarVendaComponent } from './componentes/venda/cancelar-venda/cancelar-venda.component';
import { MetodoPagamentoComponent } from './componentes/venda/metodo-pagamento/metodo-pagamento.component';
import { PesquisarProdutoComponent } from './componentes/venda/pesquisar-produto/pesquisar-produto.component';
import { ProdutoPesoComponent } from './componentes/venda/produto-peso/produto-peso.component';
import { MenuLateralComponent } from './layout/menu-lateral/menu-lateral.component';
import { SelectComponent } from './form/select/select.component';
import { MiniBotaoComponent } from './layout/mini-botao/mini-botao.component';
import { GerenciarOpcaoComponent } from './componentes/cadastro-produto/gerenciar-opcao/gerenciar-opcao.component';
import { EstoqueComponent } from './componentes/estoque/estoque.component';
import { FeedbackComponent } from './layout/feedback/feedback.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { EditarStatusComponent } from './componentes/relatorio-fiado/editar-status/editar-status.component';
import { ApagarFiadoComponent } from './componentes/relatorio-fiado/apagar-fiado/apagar-fiado.component';
import { MensagensComponent } from './componentes/mensagens/mensagens.component';
import { MsgComponent } from './componentes/mensagens/msg/msg.component';
import { DetalhesProdutoComponent } from './componentes/detalhes-produto/detalhes-produto.component';
import { CaixaDetalheComponent } from './componentes/detalhes-produto/caixa-detalhe/caixa-detalhe.component';
import { LabelInformacoesComponent } from './componentes/detalhes-produto/label-informacoes/label-informacoes.component';
import { LinhaDoTempoComponent } from './componentes/detalhes-produto/linha-do-tempo/linha-do-tempo.component';
import { CaixaComponent } from './componentes/caixa/caixa.component';
import { CadastroBanhoETosaComponent } from './componentes/banho-e-tosa/cadastro-banho-e-tosa/cadastro-banho-e-tosa.component';
import { Select2Component } from './form/select2/select2.component';
import { BanhoETosaComponent } from './componentes/banho-e-tosa/banho-e-tosa.component';
import { LoginComponent } from './componentes/login/login.component';
import { LancamentoComponent } from './componentes/lancamento/lancamento.component';
import { AdicionarLancamentoComponent } from './componentes/lancamento/adicionar-lancamento/adicionar-lancamento.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotaFiscalComponent } from './componentes/venda/nota-fiscal/nota-fiscal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localePt);
////InputSimplesComponent,
@NgModule({
  declarations: [
    AppComponent,
    CadastroProdutoComponent,
    MensagemErroComponent,
    VendaComponent,
    RelatorioComponent,
    RelatorioFiadoComponent,
    InfoComponent,
    BotaoGrandeComponent,
    ContainerImageComponent,
    MenuOpcaoComponent,

    TabelaVendaComponent,
    JanelaComponent,
    InputComponent,
    EditarDescQtdComponent,
    CancelarVendaComponent,
    MetodoPagamentoComponent,
    PesquisarProdutoComponent,
    ProdutoPesoComponent,
    MenuLateralComponent,
    SelectComponent,
    MiniBotaoComponent,
    GerenciarOpcaoComponent,
    EstoqueComponent,
    FeedbackComponent,
    EditarStatusComponent,
    ApagarFiadoComponent,
    MensagensComponent,
    MsgComponent,
    DetalhesProdutoComponent,
    CaixaDetalheComponent,
    LabelInformacoesComponent,
    LinhaDoTempoComponent,
    CaixaComponent,
    CadastroBanhoETosaComponent,
    Select2Component,
    BanhoETosaComponent,
    LoginComponent,
    LancamentoComponent,
    AdicionarLancamentoComponent,
    ClientesComponent,
    NotaFiscalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SlickCarouselModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    NgSelectModule,
    NgbModule,
    SharedModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
