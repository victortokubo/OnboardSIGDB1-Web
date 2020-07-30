import { Funcionario } from './../funcionario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CpfValido } from '../../helper/validacoes';
import { Router } from '@angular/router';
import { AlertaService } from '../../alerta/alerta.service';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent implements OnInit {

  tentouSalvar = false;

  cadastroForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    cpf: new FormControl('', [Validators.required, CpfValido]),
    dataContratacao: new FormControl('')
  });

  constructor(private funcionarioService: FuncionarioService, private router: Router, private alertaService: AlertaService) { }

  ngOnInit() {
  }

  salvar() {
    this.tentouSalvar = true;

    if (this.cadastroForm.invalid) {
      return;
    }

    let funcionario = new Funcionario();

    funcionario.nome = this.cadastroForm.get('nome').value;
    funcionario.cpf = this.cadastroForm.get('cpf').value;
    funcionario.dataContratacao = this.cadastroForm.get('dataContratacao').value;

    this.funcionarioService.criarFuncionario(funcionario).subscribe(() => {
      this.alertaService.success('Salvo com sucesso', true);
      this.router.navigate(['/funcionarios']);
    });
  }

}
