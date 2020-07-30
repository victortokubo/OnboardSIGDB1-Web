import { AlertaService } from './../../alerta/alerta.service';
import { EmpresaService } from './../empresa.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Empresa } from '../empresa';
import { Router } from '@angular/router';
import { CnpjValido } from '../../helper/validacoes';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {

  tentouSalvar = false;

  cadastroForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    cnpj: new FormControl('', [Validators.required, CnpjValido]),
    dataFundacao: new FormControl('')
  });

  constructor(private empresaService: EmpresaService, private router: Router, private alertaService: AlertaService) { }

  ngOnInit() {
  }

  salvar() {
    this.tentouSalvar = true;

    if (this.cadastroForm.invalid) {
      return;
    }

    let empresa = new Empresa();

    empresa.nome = this.cadastroForm.get('nome').value;
    empresa.cnpj = this.cadastroForm.get('cnpj').value;
    empresa.dataFundacao = this.cadastroForm.get('dataFundacao').value;

    this.empresaService.criarEmpresa(empresa).subscribe(result => {
      this.alertaService.success('Salvo com sucesso', true);
      this.router.navigate(['/empresas']);
    });
  }

}
