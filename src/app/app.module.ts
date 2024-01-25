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
    VendaComponent
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
