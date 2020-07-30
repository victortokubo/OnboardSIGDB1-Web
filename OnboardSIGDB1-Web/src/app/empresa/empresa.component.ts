import { AlertaService } from './../alerta/alerta.service';
import { FiltroEmpresa } from './filtro-empresa';
import { EmpresaService } from './empresa.service';
import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Empresa } from './empresa';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements AfterViewInit {
  empresas: Empresa[];
  filtroForm = new FormGroup({
    nome: new FormControl('', [Validators.maxLength(150)]),
    cnpj: new FormControl(''),
    dataFundacao: new FormControl('')
  });

  constructor(private empresaService: EmpresaService, private alertaService: AlertaService) { }

  ngAfterViewInit(): void {
    this.carregarListaEmpresa();
  }

  carregarListaEmpresa() {
    this.empresaService.obterTodasEmpresas().subscribe(result => {
      this.empresas = result;
    });
  }

  filtrar() {
    let filtro = new FiltroEmpresa();
    filtro.nome = this.filtroForm.get('nome').value;
    filtro.cnpj = this.filtroForm.get('cnpj').value;
    filtro.dataFundacao = this.filtroForm.get('dataFundacao').value;
    this.empresaService.obterEmpresas(filtro).subscribe(result => {
      this.empresas = result;
    },
    error => {
      this.alertaService.error(error, true);
    });
  }

  excluir(id: number) {
    this.empresaService.excluirEmpresa(id).subscribe(result => {
      this.alertaService.success("Excluído com sucesso", true);
      this.carregarListaEmpresa();
    },
    error => {
      console.log(error);
      this.alertaService.error(error, true);      
    });
  }
}
