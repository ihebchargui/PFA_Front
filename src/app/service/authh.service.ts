
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
const httpOptions = {
  headers : new HttpHeaders({Content_Type : 'application/json' })
};
const AUTH_API = 'http://localhost:8081/daddesh/auth/';
@Injectable({
  providedIn: 'root'
})
export class AuthhService {

  constructor(private  http: HttpClient) { }
  
  login(credentials: any): Observable<any>
  {
return this.http.post(AUTH_API + 'authenticate'  , {

 /* email: credentials.emailId ,*/
 emailId: credentials.emailId ,

  password: credentials.password

  } , httpOptions);
console.log(credentials);
  }

 
}
/*
login(username: string, password: string ): Observable<boolean> {
    
  return this.http.post<any>("http://localhost:8081/daddesh/authenticate",{emailId:username,password:password})
    .pipe(
      tap(token =>{ this.doLoginUser(username, token.token)
      console.log(token);
      }),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
}*/