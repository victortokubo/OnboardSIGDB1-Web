import { AlertaService } from './../../alerta/alerta.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpresaService } from '../empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Empresa } from '../empresa';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edicao-empresa',
  templateUrl: './edicao-empresa.component.html',
  styleUrls: ['./edicao-empresa.component.css']
})
export class EdicaoEmpresaComponent implements OnInit, AfterViewInit {

  id: number = 0;
  tentouSalvar = false;

  cadastroForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    cnpj: new FormControl('', [Validators.required]),
    dataFundacao: new FormControl('')
  });

  constructor(private empresaService: EmpresaService, private router: Router, private activatedRoute: ActivatedRoute, private datePipe: DatePipe, private alertaService: AlertaService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (!params["id"]) {
        this.alertaService.error
        console.log("parâmetro id não localizado");
        this.router.navigate(["/empresas"]);
      }

      try {
        this.id = Number.parseInt(params["id"]);
        if (this.id <= 0) {
          console.log("parâmetro id inválido");
          this.router.navigate(["/empresas"]);
        }
      } catch (error) {
        console.log("parâmetro id inválido");
        this.router.navigate(["/empresas"]);
      }
    })
  }

  ngAfterViewInit(): void {
    this.obterEmpresa(this.id);
  }

  obterEmpresa(id: number) {
    this.empresaService.obterEmpresa(id).subscribe(result => {
      this.cadastroForm.get('nome').setValue(result.nome);
      this.cadastroForm.get('cnpj').setValue(result.cnpj);

      if (result.dataFundacao) {
        this.cadastroForm.get('dataFundacao').setValue(this.datePipe.transform(result.dataFundacao, 'yyyy-MM-dd'));
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

    let empresa = new Empresa();

    empresa.id = this.id;
    empresa.nome = this.cadastroForm.get('nome').value;
    empresa.cnpj = this.cadastroForm.get('cnpj').value;
    empresa.dataFundacao = this.cadastroForm.get('dataFundacao').value;

    this.empresaService.editarEmpresa(empresa).subscribe(result => {
      this.alertaService.success("Salvo com sucesso", true);
      this.router.navigate(['/empresas']);
    },
      error => {        
        console.log(error);
        this.alertaService.error(error, true);
      });

  }
}
