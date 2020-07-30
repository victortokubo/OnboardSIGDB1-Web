import { CargoService } from './../cargo.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaService } from '../../alerta/alerta.service';
import { Cargo } from '../cargo';

@Component({
  selector: 'app-cadastro-cargo',
  templateUrl: './cadastro-cargo.component.html',
  styleUrls: ['./cadastro-cargo.component.css']
})
export class CadastroCargoComponent implements OnInit {

  tentouSalvar = false;

  cadastroForm = new FormGroup({
    descricao: new FormControl('', [Validators.required, Validators.maxLength(250)]),
  });

  constructor(private cargoService: CargoService, private router: Router, private alertaService: AlertaService) { }

  ngOnInit() {
  }

  salvar() {
    this.tentouSalvar = true;

    if (this.cadastroForm.invalid) {
      return;
    }

    let cargo = new Cargo();

    cargo.descricao = this.cadastroForm.get('descricao').value;

    this.cargoService.criarCargo(cargo).subscribe(result => {
      this.alertaService.success('Salvo com sucesso', true);
      this.router.navigate(['/cargos']);
    });
  }

}
