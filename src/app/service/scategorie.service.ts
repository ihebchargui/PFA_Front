import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';
import { Scategorie } from '../models/scategorie';

@Injectable({
  providedIn: 'root'
})
export class ScategorieService {
  choixmenu : string  = 'A';
  public dataForm:  FormGroup; 
  listData : Scategorie[];
  apiurl="http://localhost:8081/daddesh/scategorie"

  constructor(private http: HttpClient) { }

  
  deleteScategorie(id): Observable<any>{
    return this.http
    .delete<any>(this.apiurl+'/remove/?id='+id) 
  }  


public getScategories():Observable<Scategorie[]>{
  return this.http.get<Scategorie[]>(`${this.apiurl}/`);
}
public getByCategory():Observable<Categorie[]>{
  return this.http.get<Categorie[]>(`${this.apiurl}/findbyCategory?categorie=`);
}


public addScategorie(scategorie: Scategorie): Observable<Scategorie> {
  console.log(scategorie);
  return this.http.post<Scategorie>(`${this.apiurl}/add`, scategorie);
}

public updateScategorie(scategorie: Scategorie): Observable<Scategorie> {
  return this.http.put<Scategorie>(`${this.apiurl}/update`, scategorie);
}

public deleteScat(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiurl}/remove/${id}`);
}

}
