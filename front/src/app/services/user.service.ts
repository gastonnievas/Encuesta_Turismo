import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'login'
   }


   login(user: User): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, user)
   }
   

   loggedIn(){
    const token = localStorage.getItem('token');
  
    if (token === "undefined") {
      localStorage.removeItem('token')
      this.router.navigate(['/login']);
      return false
      
    }else {
      return !!localStorage.getItem('token')
    }
  }

   logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
   }
}
