import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Survey } from '../interfaces/survey';

@Injectable({
  providedIn: 'root'
})
export class getService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'getall'
  }

  get(): Observable<Survey[]> {
    const token = localStorage.getItem('token')

      const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`)
      return this.http.get<Survey[]>(`${this.myAppUrl}${this.myApiUrl}`, { headers: headers } ) 
    }
      
    export()  {
    
      return this.http.get(`${this.myAppUrl}export`, {responseType: "text"});
    }
}
