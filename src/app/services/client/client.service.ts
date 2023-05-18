import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { map, retry, catchError, mapTo, ignoreElements, concatMap } from 'rxjs/operators'
import { Client } from 'src/app/common/client/client';
import { ClientForm } from '../../common/clientForm/client-form';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  private baseUrl = 'http://localhost:8080/eventApp/client'

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  deleteClientAndLogout(): Observable<void> {
    const id = this.getClientLogado();
  
    return this.deleteClient(id).pipe(
      concatMap(() => {
        this.logout();
        return of(null);
      })
    );
  }

  getPerfil(): Observable<Client> {
    const id = this.getClientLogado();
    if(id != 0){
      return this.getClient(id);
    }
    return of(null);
  }

  logout(){
    localStorage.removeItem('client');
  }

  setClientLogado(client: Client) {
    localStorage.setItem('client', client.id + "");
  }

  getClientLogado(): number {
    return Number(localStorage.getItem('client'));
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

  loginClient(client: ClientForm): Observable<Client> {
    return this.httpClient.post<Client>(this.baseUrl + "/login", client, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteClient(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
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

