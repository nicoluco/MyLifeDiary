import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  //Se establece la base url de la API a consumir

  apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=santiago&appid=886547d5360093412f7ed3bb4e552347&lang=es&units=metric';
  // Se declara la variable http de tipo HttpClient
  constructor(private http: HttpClient) { }

  getTiempo(): Observable<any> {
    return this.http.get(this.apiURL).pipe(
      retry(3)
    );
  }
}
