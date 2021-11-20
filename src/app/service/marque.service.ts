import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Marque } from '../models/marque';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  apiurl="http://localhost:8081/daddesh/marque"

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
 
    return this.http.get(this.apiurl+'/')
    .pipe(
      tap(marque =>{ 
      console.log(marque);
      }),
      );
  }
  deleteMarque(id): Observable<any>{
    return this.http
    .delete<any>(this.apiurl+'/remove/?id='+id) 
  }
  public getMarques():Observable<Marque[]>{
    return this.http.get<Marque[]>(`${this.apiurl}/`);
  }
  
  public addMarque(marque: Marque): Observable<Marque> {
    return this.http.post<Marque>(`${this.apiurl}/add`, marque);
  }
  
  public updateMarque(marque: Marque): Observable<Marque> {
    return this.http.put<Marque>(`${this.apiurl}/update`, marque);
  }
  public deleteMar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/remove/${id}`);
  }

}
