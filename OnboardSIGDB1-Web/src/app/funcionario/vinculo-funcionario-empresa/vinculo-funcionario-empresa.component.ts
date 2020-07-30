import { DropdownEmpresa } from './../../empresa/dropdown-empresa';
import { EmpresaService } from './../../empresa/empresa.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Funcionario } from '../funcionario';
import { FormGroup, FormControl } from '@angular/forms';
import { FuncionarioService } from '../funcionario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertaService } from '../../alerta/alerta.service';

@Component({
  selector: 'app-vinculo-funcionario-empresa',
  templateUrl: './vinculo-funcionario-empresa.component.html',
  styleUrls: ['./vinculo-funcionario-empresa.component.css']
})
export class VinculoFuncionarioEmpresaComponent implements OnInit, AfterViewInit {

  id: number = 0;
  tentouSalvar = false;
  funcionarioEditado = new Funcionario();
  dropdownEmpresa: DropdownEmpresa[];

  cadastroForm = new FormGroup({
    empresaId: new FormControl(''),
  });

  constructor(private funcionarioService: FuncionarioService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private alertaService: AlertaService,
    private empresaService: EmpresaService) { }

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
    this.carregarDropdownEmpresa();
    this.obterFuncionario(this.id);
  }

  carregarDropdownEmpresa() {
    this.empresaService.obterDropdownEmpresa().subscribe(result => {
      this.dropdownEmpresa = result;
    })
  }

  obterFuncionario(id: number) {
    this.funcionarioService.obterFuncionario(id).subscribe(result => {
      this.funcionarioEditado = result;
      document.getElementById('nomeFuncionario').setAttribute("value", this.funcionarioEditado.nome);
      this.cadastroForm.get('empresaId').setValue(this.funcionarioEditado.empresaId);
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
    funcionario.nome = this.funcionarioEditado.nome;
    funcionario.cpf = this.funcionarioEditado.cpf;
    funcionario.dataContratacao = this.funcionarioEditado.dataContratacao;
    funcionario.empresaId = this.cadastroForm.get('empresaId').value;
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
