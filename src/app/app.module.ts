import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CardHomeComponent } from './componentes/card-home/card-home.component';
import { HomeComponent } from './componentes/home/home.component';
import { CadastroProdutoComponent } from './componentes/cadastro-produto/cadastro-produto.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { ProdutoComponent } from './componentes/produto/produto.component';
import { MensagemErroComponent } from './componentes/mensagem-erro/mensagem-erro.component';
import {MatSelectModule} from '@angular/material/select';
import { HomeClininaComponent } from './componentes/home-clinina/home-clinina.component';
import { VendaComponent } from './componentes/venda/venda.component';
import { RelatorioComponent } from './componentes/relatorio/relatorio.component';
import { RelatorioFiadoComponent } from './componentes/relatorio-fiado/relatorio-fiado.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfoComponent } from './layout/info/info.component';
import { BotaoGrandeComponent } from './layout/botao-grande/botao-grande.component';
import { ContainerImageComponent } from './layout/container-image/container-image.component';
import { MenuOpcaoComponent } from './layout/menu-opcao/menu-opcao.component';
import { InputSimplesComponent } from './layout/input-simples/input-simples.component';
import { TabelaVendaComponent } from './componentes/venda/tabela-venda/tabela-venda.component';
import { JanelaComponent } from './layout/janela/janela.component';
import { InputComponent } from './form/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardHomeComponent,
    HomeComponent,
    CadastroProdutoComponent,
    ProdutoComponent,
    MensagemErroComponent,
    HomeClininaComponent,
    VendaComponent,
    RelatorioComponent,
    RelatorioFiadoComponent,
    InfoComponent,
    BotaoGrandeComponent,
    ContainerImageComponent,
    MenuOpcaoComponent,
    InputSimplesComponent,
    TabelaVendaComponent,
    JanelaComponent,
    InputComponent
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
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
