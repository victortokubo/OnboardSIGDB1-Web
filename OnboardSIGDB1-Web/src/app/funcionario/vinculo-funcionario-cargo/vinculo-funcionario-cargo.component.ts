import { DropdownCargo } from './../../cargo/dropdown-cargo';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../funcionario';
import { FormGroup, FormControl } from '@angular/forms';
import { FuncionarioService } from '../funcionario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertaService } from '../../alerta/alerta.service';
import { CargoService } from '../../cargo/cargo.service';

@Component({
  selector: 'app-vinculo-funcionario-cargo',
  templateUrl: './vinculo-funcionario-cargo.component.html',
  styleUrls: ['./vinculo-funcionario-cargo.component.css']
})
export class VinculoFuncionarioCargoComponent implements OnInit {

  id: number = 0;
  tentouSalvar = false;
  funcionarioEditado = new Funcionario();
  dropdownCargo: DropdownCargo[];

  cadastroForm = new FormGroup({
    cargoId: new FormControl(''),
  });

  constructor(private funcionarioService: FuncionarioService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private alertaService: AlertaService,
    private cargoService: CargoService) { }

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
    this.carregarDropdownCargo();
    this.obterFuncionario(this.id);
  }

  carregarDropdownCargo() {
    this.cargoService.obterDropdownCargo().subscribe(result => {
      this.dropdownCargo = result;
    })
  }

  obterFuncionario(id: number) {
    this.funcionarioService.obterFuncionario(id).subscribe(result => {
      this.funcionarioEditado = result;
      document.getElementById('nomeFuncionario').setAttribute("value", this.funcionarioEditado.nome);
      this.cadastroForm.get('cargoId').setValue(this.funcionarioEditado.cargoId);
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
    funcionario.empresaId = this.funcionarioEditado.empresaId;
    funcionario.cargoId = this.cadastroForm.get('cargoId').value;

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
