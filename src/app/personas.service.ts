import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(protected http: HttpClient) { }

  getPersonas(){
    return this.http.get('https://randomapi.com/api/8rp5md1n?key=Y8TJ-PQB5-P8NC-JM6W');
  }

}
