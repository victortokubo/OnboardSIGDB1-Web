import { DropdownEmpresa } from './dropdown-empresa';
import { FiltroEmpresa } from './filtro-empresa';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _throw as throwError } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';
import { Empresa } from './empresa';

@Injectable()
export class EmpresaService {

  private readonly _urlApi: string;

  constructor(private http: HttpClient) {
    this._urlApi = 'https://localhost:44325/api/empresa'
  }

  obterTodasEmpresas(): Observable<Empresa[]> {
    let endpoint = `${this._urlApi}`;
    return this.http.get<Empresa[]>(endpoint).pipe(
      catchError(this.handleError)
    )
  }

  pesquisarEmpresas(filtro: FiltroEmpresa): Observable<Empresa[]> {
    let endpoint = `${this._urlApi}/pesquisar`;
    let params = new HttpParams();

    params = params.append('Nome', filtro.nome)
    params = params.append('NumeroDocumento', filtro.cnpj)
    params = params.append('Data', filtro.dataFundacao.toString());

    return this.http.get<Empresa[]>(endpoint, { params: params }).pipe(
      catchError(this.handleError)
    )
  }

  obterEmpresa(id: number): Observable<Empresa> {
    let endpoint = `${this._urlApi}/${id}`;

    return this.http.get<Empresa>(endpoint).pipe(
      catchError(this.handleError)
    )
  }

  obterDropdownEmpresa(): Observable<DropdownEmpresa[]> {
    let endpoint = `${this._urlApi}/dropdown`;

    return this.http.get<DropdownEmpresa[]>(endpoint).pipe(
      catchError(this.handleError)
    )
  }

  criarEmpresa(empresa: Empresa) {
    let endpoint = `${this._urlApi}`;
    return this.http.post(endpoint, empresa);
  }

  editarEmpresa(empresa: Empresa) {
    let endpoint = `${this._urlApi}`;
    let params = new HttpParams();
    params = params.append('id', empresa.id.toString());
    return this.http.put(endpoint, empresa, { params: params }).pipe(
      catchError(this.handleError)
    )
  }

  excluirEmpresa(id: number) {
    let endpoint = `${this._urlApi}`;
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.delete(endpoint, { params: params }).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

      console.log("ERROR");
      console.log(error);
    }
    // Return an observable with a user-facing error message.
    return throwError(error);
  }

}
