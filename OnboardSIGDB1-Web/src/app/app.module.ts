import { CargoService } from './cargo/cargo.service';
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
import { CadastroCargoComponent } from './cargo/cadastro-cargo/cadastro-cargo.component';
import { EdicaoCargoComponent } from './cargo/edicao-cargo/edicao-cargo.component';
import { FuncionarioService } from './funcionario/funcionario.service';
import { CadastroFuncionarioComponent } from './funcionario/cadastro-funcionario/cadastro-funcionario.component';
import { EdicaoFuncionarioComponent } from './funcionario/edicao-funcionario/edicao-funcionario.component';
import { MascaraCpfDirective } from './helper/mascara-cpf.directive';
import { CpfPipe } from './helper/cpf.pipe';
import { CnpjPipe } from './helper/cnpj.pipe';
import { VinculoFuncionarioEmpresaComponent } from './funcionario/vinculo-funcionario-empresa/vinculo-funcionario-empresa.component';
import { VinculoFuncionarioCargoComponent } from './funcionario/vinculo-funcionario-cargo/vinculo-funcionario-cargo.component';

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
    MascaraCnpjDirective,
    CadastroCargoComponent,
    EdicaoCargoComponent,
    CadastroFuncionarioComponent,
    EdicaoFuncionarioComponent,
    MascaraCpfDirective,
    CpfPipe,
    CnpjPipe,
    VinculoFuncionarioEmpresaComponent,
    VinculoFuncionarioCargoComponent
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
    LoggingService,
    CargoService,
    FuncionarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
