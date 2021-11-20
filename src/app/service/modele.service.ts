import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Marque } from '../models/marque';
import { Modele} from '../models/Modele';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {
  choixmenu : string  = 'A';
  public dataForm:  FormGroup; 
  listData : Modele[];
  apiurl="http://localhost:8081/daddesh/modele"

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
 
    return this.http.get(this.apiurl+'/')
    .pipe(
      tap(modele =>{ 
      console.log(modele);
      }),
      );
  }
  deleteModele(id): Observable<any>{
    return this.http
    .delete<any>(this.apiurl+'/remove/?id='+id) 
  }
  public getModeles():Observable<Modele[]>{
    return this.http.get<Modele[]>(`${this.apiurl}/`);
  }
  
  public getByMarque():Observable<Marque[]>{
    return this.http.get<Marque[]>(`${this.apiurl}/findbyMarque?categorie=`);
  }
  
  public addModele(modele: Modele): Observable<Modele> {
    return this.http.post<Modele>(`${this.apiurl}/add`, modele);
  }
  
  public updateModele(modele: Modele): Observable<Modele> {
    return this.http.put<Modele>(`${this.apiurl}/update`, modele);
  }
  public deleteMod(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/remove/${id}`);
  }

}

