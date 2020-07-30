import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Cargo } from './cargo';
import { AlertaService } from '../alerta/alerta.service';
import { CargoService } from './cargo.service';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements AfterViewInit {

  cargos: Cargo[];

  constructor(private cargoService: CargoService, private alertaService: AlertaService) { }

  ngAfterViewInit(): void {
    this.carregarListaCargos();
  }

  carregarListaCargos() {
    this.cargoService.obterTodaosCargos().subscribe(result => {
      this.cargos = result;
    });
  }

  excluir(id: number) {
    this.cargoService.excluirCargo(id).subscribe(result => {
      this.alertaService.success("Excluído com sucesso", true);
      this.carregarListaCargos();
    },
    error => {
      console.log(error);
      this.alertaService.error(error, true);      
    });
  }

}
