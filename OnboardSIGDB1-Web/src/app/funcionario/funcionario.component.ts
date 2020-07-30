import { Component, AfterViewInit } from '@angular/core';
import { Funcionario } from './funcionario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertaService } from '../alerta/alerta.service';
import { FiltroFuncionario } from './filtro-funcionario';
import { FuncionarioService } from './funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements AfterViewInit {

  funcionarios: Funcionario[];
  filtroForm = new FormGroup({
    nome: new FormControl('', [Validators.maxLength(150)]),
    cpf: new FormControl(''),
    dataContratacao: new FormControl('')
  });

  constructor(private funcionarioService: FuncionarioService, private alertaService: AlertaService) { }

  ngAfterViewInit(): void {
    this.carregarListaFuncionario();
  }

  carregarListaFuncionario() {
    this.funcionarioService.obterTodosFuncionarios().subscribe(result => {
      this.funcionarios = result;
    });
  }

  filtrar() {
    let filtro = new FiltroFuncionario();
    filtro.nome = this.filtroForm.get('nome').value;
    filtro.cpf = this.filtroForm.get('cpf').value;
    filtro.dataContratacao = this.filtroForm.get('dataContratacao').value;
    this.funcionarioService.pesquisarFuncionarios(filtro).subscribe(result => {
      this.funcionarios = result;
    },
    error => {
      this.alertaService.error(error, true);
    });
  }

  excluir(id: number) {
    this.funcionarioService.excluirFuncionario(id).subscribe(() => {
      this.alertaService.success("Excluído com sucesso", true);
      this.carregarListaFuncionario();
    },
    error => {
      console.log(error);
      this.alertaService.error(error, true);      
    });
  }

}
