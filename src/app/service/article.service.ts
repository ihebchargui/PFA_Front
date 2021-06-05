import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { Scategorie } from '../models/scategorie';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  choixmenu : string  = 'A';
  public dataForm:  FormGroup; 
  listData : Article[];
  apiurl="http://localhost:8081/daddesh/article"

  constructor(private http: HttpClient) { }

  
  deleteArticle(id): Observable<any>{
    return this.http
    .delete<any>(this.apiurl+'/remove/?id='+id) 
  }  


public getArticles():Observable<Article[]>{
  return this.http.get<Article[]>(`${this.apiurl}/`);
}
public getByScategory():Observable<Scategorie[]>{
  return this.http.get<Scategorie[]>(`${this.apiurl}/findbyScategory?scategorie=`);
}


public addArticle(article: Article): Observable<Article> {
  console.log(article);
  return this.http.post<Article>(`${this.apiurl}/add`, article);
}

public updateArticle(article: Article): Observable<Article> {
  return this.http.put<Article>(`${this.apiurl}/update`, article);
}

public deleteArt(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiurl}/remove/${id}`);
}

}



