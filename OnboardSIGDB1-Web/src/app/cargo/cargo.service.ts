import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargo } from './cargo';
import { catchError } from 'rxjs/operators';
import { _throw as throwError } from 'rxjs/observable/throw';

@Injectable()
export class CargoService {

  private readonly _urlApi: string;

  constructor(private http: HttpClient) {
    this._urlApi = 'https://localhost:44325/api/cargo'
  }

  obterTodaosCargos(): Observable<Cargo[]> {
    let endpoint = `${this._urlApi}`;
    return this.http.get<Cargo[]>(endpoint).pipe(
      catchError(this.handleError)
    )
  }

  obterCargo(id: number): Observable<Cargo> {
    let endpoint = `${this._urlApi}/${id}`;

    return this.http.get<Cargo>(endpoint).pipe(
      catchError(this.handleError)
    )
  }

  criarCargo(cargo: Cargo) {
    let endpoint = `${this._urlApi}`;
    return this.http.post(endpoint, cargo);
  }

  editarCargo(cargo: Cargo) {
    let endpoint = `${this._urlApi}`;
    let params = new HttpParams();
    params = params.append('id', cargo.id.toString());
    return this.http.put(endpoint, cargo, { params: params }).pipe(
      catchError(this.handleError)
    )
  }

  excluirCargo(id: number) {
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
