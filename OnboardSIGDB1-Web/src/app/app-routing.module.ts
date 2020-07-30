import { EdicaoCargoComponent } from './cargo/edicao-cargo/edicao-cargo.component';
import { CadastroCargoComponent } from './cargo/cadastro-cargo/cadastro-cargo.component';
import { EdicaoEmpresaComponent } from './empresa/edicao-empresa/edicao-empresa.component';
import { CadastroEmpresaComponent } from './empresa/cadastro-empresa/cadastro-empresa.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { CargoComponent } from './cargo/cargo.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "", component: EmpresaComponent },
      { path: "empresas", component: EmpresaComponent },
      { path: "empresas/cadastro", component: CadastroEmpresaComponent },
      { path: "empresas/cadastro/:id", component: EdicaoEmpresaComponent },
      { path: "funcionarios", component: FuncionarioComponent },
      { path: "cargos", component: CargoComponent },
      { path: "cargos/cadastro", component: CadastroCargoComponent },
      { path: "cargos/cadastro/:id", component: EdicaoCargoComponent },
      { path: "**", component: EmpresaComponent },
    ],
      { useHash: false }
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
