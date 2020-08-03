import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { FiltroFuncionario } from './filtro-funcionario';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Funcionario } from './funcionario';
import { catchError } from 'rxjs/operators';
import { _throw as throwError } from 'rxjs/observable/throw';

@Injectable()
export class FuncionarioService {

  private readonly _urlApi: string;

  constructor(private http: HttpClient) {
    this._urlApi = `${environment.apiUrl}funcionario`;
  }

  obterTodosFuncionarios(): Observable<Funcionario[]> {
    let endpoint = `${this._urlApi}`;
    return this.http.get<Funcionario[]>(endpoint).pipe(
      catchError(this.handleError)
    )
  }

  pesquisarFuncionarios(filtro: FiltroFuncionario): Observable<Funcionario[]> {
    let endpoint = `${this._urlApi}/pesquisar`;
    let params = new HttpParams();

    params = params.append('Nome', filtro.nome)
    params = params.append('Cpf', filtro.cpf)
    params = params.append('DataContratacao', filtro.dataContratacao.toString());

    return this.http.get<Funcionario[]>(endpoint, { params: params }).pipe(
      catchError(this.handleError)
    )
  }

  obterFuncionario(id: number): Observable<Funcionario> {
    let endpoint = `${this._urlApi}/${id}`;

    return this.http.get<Funcionario>(endpoint).pipe(
      catchError(this.handleError)
    )
  }

  criarFuncionario(funcionario: Funcionario) {
    let endpoint = `${this._urlApi}`;
    return this.http.post(endpoint, funcionario);
  }

  editarFuncionario(funcionario: Funcionario) {
    let endpoint = `${this._urlApi}`;
    let params = new HttpParams();
    params = params.append('id', funcionario.id.toString());
    return this.http.put(endpoint, funcionario, { params: params }).pipe(
      catchError(this.handleError)
    )
  }

  excluirFuncionario(id: number) {
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
