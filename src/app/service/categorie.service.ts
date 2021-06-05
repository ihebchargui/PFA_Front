import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  apiurl="http://localhost:8081/daddesh/categorie"
 /* httpOptions = {
    headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
  toastr: any;
    */

  constructor(private http: HttpClient) { }

  


getAll(): Observable<any> {
 
  return this.http.get(this.apiurl+'/')
  .pipe(
    tap(categorie =>{ 
    console.log(categorie);
    }),
    );
}

deleteCategorie(id): Observable<any>{
  return this.http
  .delete<any>(this.apiurl+'/remove/?id='+id) 
}
/*
updateCategorie(categorie:Categorie): Observable<Categorie>{
    
  return this.http.put<Categorie>(this.apiurl+'/update',categorie) 
   
}*/
/**************************/

public getCategories():Observable<Categorie[]>{
  return this.http.get<Categorie[]>(`${this.apiurl}/`);
}

public addCategorie(categorie: Categorie): Observable<Categorie> {
  return this.http.post<Categorie>(`${this.apiurl}/add`, categorie);
}

public updateCategorie(categorie: Categorie): Observable<Categorie> {
  return this.http.put<Categorie>(`${this.apiurl}/update`, categorie);
}
/*
updateCategorie(categorie): Observable<any>{
    
  return this.http.put(this.apiurl+'/update',categorie) 
   .pipe(
    tap(categorie =>{ 
    console.log(categorie);
    }),
    );
}
*/
public deleteCat(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiurl}/remove/${id}`);
}

}
