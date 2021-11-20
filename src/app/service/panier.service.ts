import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class PanierService {
  apiurl="http://localhost:8081/daddesh/commande"
  httpOptions = {
    headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
  constructor(private http: HttpClient,private toastr: ToastrService) { }

  addCommande(data): Observable<any>{
    return this.http
    .post<any>(this.apiurl+'/add',data,this.httpOptions) 

    .pipe(
      tap(Commande =>{ 
      console.log(Commande);
      this.toastr.success('Commande Ajouter');
      }),
     mapTo(true)
      ,
      catchError(error => {
        
        this.toastr.error('Error !!!'+error, 'Erreur!');
        return of(false);
      }));
  }

  getCommandes(): Observable<any>{
   
    return this.http
    .get<any>(this.apiurl+'/findbyUser?user='+localStorage.getItem('UserInfo'),this.httpOptions) 
  }
  /*getCommandes(user): Observable<any>{
   
    return this.http
    .get<any>(this.apiurl+'/findbyUser?user='+localStorage.getItem('UserInfo'),this.httpOptions) 
  }*/
  deleteCommande(id): Observable<any>{
    return this.http
    .delete<any>(this.apiurl+'/remove/?id='+id) 
  }


}
