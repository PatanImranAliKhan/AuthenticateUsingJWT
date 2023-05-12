import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token',
      "x-access-token": "abc"
    })
  };

  authToken = "";

  registerUser(userData: any) {
    return this.http.post('http://localhost:5000/register', userData);
  }

  getLoginUser(userData: any) {
    return this.http.get(`http://localhost:5000/login/${userData.Email}/${userData.Password}`)
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token') || "";
  }

  validateToken() {
    return this.http.get(`http://localhost:5000/`);
  }

  removeToken() {
    localStorage.removeItem('token')
  }

}
