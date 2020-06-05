import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators'
import { Client } from 'src/app/common/client/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  private baseUrl = 'http://localhost:8080/eventApp/client'

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getClientList(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.baseUrl)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getClient(id: number): Observable<Client> {
    return this.httpClient.get<Client>(this.baseUrl + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.baseUrl, client, this.httpOptions)
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

