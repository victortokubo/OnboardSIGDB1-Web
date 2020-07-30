import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CargoService } from '../cargo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertaService } from '../../alerta/alerta.service';
import { Cargo } from '../cargo';

@Component({
  selector: 'app-edicao-cargo',
  templateUrl: './edicao-cargo.component.html',
  styleUrls: ['./edicao-cargo.component.css']
})
export class EdicaoCargoComponent implements OnInit, AfterViewInit {

  id: number = 0;
  tentouSalvar = false;

  cadastroForm = new FormGroup({
    descricao: new FormControl('', [Validators.required, Validators.maxLength(250)]),
  });

  constructor(private cargoService: CargoService, private router: Router, private activatedRoute: ActivatedRoute, private alertaService: AlertaService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (!params["id"]) {
        this.alertaService.error
        console.log("parâmetro id não localizado");
        this.router.navigate(["/cargos"]);
      }

      try {
        this.id = Number.parseInt(params["id"]);
        if (this.id <= 0) {
          console.log("parâmetro id inválido");
          this.router.navigate(["/cargos"]);
        }
      } catch (error) {
        console.log("parâmetro id inválido");
        this.router.navigate(["/cargos"]);
      }
    })
  }

  ngAfterViewInit(): void {
    this.obterCargo(this.id);
  }

  obterCargo(id: number) {
    this.cargoService.obterCargo(id).subscribe(result => {
      this.cadastroForm.get('descricao').setValue(result.descricao);
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

    let cargo = new Cargo();

    cargo.id = this.id;
    cargo.descricao = this.cadastroForm.get('descricao').value;

    this.cargoService.editarCargo(cargo).subscribe(() => {
      this.alertaService.success("Salvo com sucesso", true);
      this.router.navigate(['/cargos']);
    },
      error => {        
        console.log(error);
        this.alertaService.error(error, true);
      });
  }

}
