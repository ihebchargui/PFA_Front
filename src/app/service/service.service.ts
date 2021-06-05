import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'
import { User } from '../auth/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  base_path="http://localhost:8081/daddesh/produit"
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

      optionsIm={
        headers: new HttpHeaders().append('Content-Type', 'image/png')
      }

    httpfileOptions = {
      headers : new HttpHeaders({
          'Content-Type' : 'multipart/form-data'
        })
      }
  createProduit(formData:FormData): Observable<any>{
    return this.http
    .post<any>(this.base_path+"/add",formData)
    
    
  }
  getAllstudents(): Observable<any>{
    return this.http
    .get<any>(this.base_path,this.httpOptions) 
  }
  
  
  public loginUser(user:User):Observable<any>{
    return this.http.post<any>("http://localhost:8081/daddesh/authenticate",user,this.httpOptions)
  }
  public registerUser(formData:FormData):Observable<any>{
    return this.http.post<any>("http://localhost:8081/daddesh/user/regg",formData)
  }
  getAll(): Observable<any> {
    return this.http.get(this.base_path+"/");
    
  }
  getFromLocalStorage(): Observable<any> {
    return JSON.parse(localStorage.getItem('produits'));

  }
  
  public getImages(id):Observable<any>{
    return this.http.get<any>(this.base_path+'/findImage/'+id+'/'+2,this.optionsIm)
  }
  

 
}
