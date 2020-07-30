import { LoggingService } from './core/logging.service';
import { ErrorService } from './core/error.service';
import { AlertaService } from './alerta/alerta.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { CargoComponent } from './cargo/cargo.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { EmpresaService } from './empresa/empresa.service';
import { CadastroEmpresaComponent } from './empresa/cadastro-empresa/cadastro-empresa.component';
import { AlertaComponent } from './alerta/alerta.component';
import { EdicaoEmpresaComponent } from './empresa/edicao-empresa/edicao-empresa.component';
import { DatePipe } from '@angular/common';
import { MascaraCnpjDirective } from './helper/mascara-cnpj.directive';
import { GlobalErrorHandler } from './core/global-error-handler';
import { ServerErrorInterceptor } from './core/server-error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaComponent,
    FuncionarioComponent,
    CargoComponent,
    MenuPrincipalComponent,
    CadastroEmpresaComponent,
    AlertaComponent,
    EdicaoEmpresaComponent,
    MascaraCnpjDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    MascaraCnpjDirective
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    EmpresaService,
    DatePipe,
    AlertaService,
    ErrorService,
    LoggingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
