import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  enviarFormulario(datos: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post('http://localhost:4001/contacto', datos, {headers});
  }

  get(): Observable<Contact[]> {
    const token = localStorage.getItem('token')

      const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`)
      return this.http.get<Contact[]>(`http://localhost:4001/getContacts`, { headers: headers } ) 
    }
}
