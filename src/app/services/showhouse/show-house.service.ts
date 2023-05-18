import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators'
import { ShowHouse } from 'src/app/common/showhouse/show-house';

@Injectable({
  providedIn: 'root'
})
export class ShowHouseService {

  private baseUrl = 'http://localhost:8080/eventApp/showHouse'

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getShowHouseList(): Observable<ShowHouse[]> {
    return this.httpClient.get<ShowHouse[]>(this.baseUrl)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getShowHouseListPorId(id: number): Observable<ShowHouse[]> {
    return this.httpClient.get<ShowHouse[]>(this.baseUrl+'/all/'+id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getShowHouse(id: number): Observable<ShowHouse> {
    return this.httpClient.get<ShowHouse>(this.baseUrl + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveShowHouse(showHouse: ShowHouse): Observable<ShowHouse> {
    return this.httpClient.post<ShowHouse>(this.baseUrl, showHouse, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteShowHouse(id: number): Observable<ShowHouse> {
    return this.httpClient.delete<ShowHouse>(this.baseUrl + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}