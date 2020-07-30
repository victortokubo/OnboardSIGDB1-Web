import { Funcionario } from './../funcionario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlertaService } from '../../alerta/alerta.service';
import { FuncionarioService } from '../funcionario.service';
import { CpfValido } from '../../helper/validacoes';

@Component({
  selector: 'app-edicao-funcionario',
  templateUrl: './edicao-funcionario.component.html',
  styleUrls: ['./edicao-funcionario.component.css']
})
export class EdicaoFuncionarioComponent implements OnInit {

  id: number = 0;
  tentouSalvar = false;
  funcionarioEditado = new Funcionario();

  cadastroForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    cpf: new FormControl('', [Validators.required, CpfValido]),
    dataContratacao: new FormControl('')
  });

  constructor(private funcionarioService: FuncionarioService, private router: Router, private activatedRoute: ActivatedRoute, private datePipe: DatePipe, private alertaService: AlertaService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (!params["id"]) {
        this.alertaService.error
        console.log("parâmetro id não localizado");
        this.router.navigate(["/funcionarios"]);
      }

      try {
        this.id = Number.parseInt(params["id"]);
        if (this.id <= 0) {
          console.log("parâmetro id inválido");
          this.router.navigate(["/funcionarios"]);
        }
      } catch (error) {
        console.log("parâmetro id inválido");
        this.router.navigate(["/funcionarios"]);
      }
    })
  }

  ngAfterViewInit(): void {
    this.obterFuncionario(this.id);
  }

  obterFuncionario(id: number) {
    this.funcionarioService.obterFuncionario(id).subscribe(result => {
      this.funcionarioEditado = result;
      this.cadastroForm.get('nome').setValue(this.funcionarioEditado.nome);
      this.cadastroForm.get('cpf').setValue(this.funcionarioEditado.cpf);

      if (this.funcionarioEditado.dataContratacao) {
        this.cadastroForm.get('dataContratacao').setValue(this.datePipe.transform(this.funcionarioEditado.dataContratacao, 'yyyy-MM-dd'));
      }
    },
      error => {
        console.log(error);
        this.alertaService.error(error, true);
      });
  }

  salvar() {
    this.tentouSalvar = true;

    if (this.cadastroForm.invalid) {
      return;
    }

    let funcionario = new Funcionario();

    funcionario.id = this.id;
    funcionario.nome = this.cadastroForm.get('nome').value;
    funcionario.cpf = this.cadastroForm.get('cpf').value;
    funcionario.dataContratacao = this.cadastroForm.get('dataContratacao').value;
    funcionario.empresaId = this.funcionarioEditado.empresaId;
    funcionario.cargoId = this.funcionarioEditado.cargoId;

    this.funcionarioService.editarFuncionario(funcionario).subscribe(() => {
      this.alertaService.success("Salvo com sucesso", true);
      this.router.navigate(['/funcionarios']);
    },
      error => {        
        console.log(error);
        this.alertaService.error(error, true);
      });
  }

}
