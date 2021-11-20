import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  apiurl="http://localhost:8081/daddesh/message"


  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
 
    return this.http.get(this.apiurl+'/')
    .pipe(
      tap(message =>{ 
      console.log(message);
      }),
      );
  }

  deleteMessage(id): Observable<any>{
    return this.http
    .delete<any>(this.apiurl+'/remove/?id='+id) 
  }

  public getMessages():Observable<Message[]>{
    return this.http.get<Message[]>(`${this.apiurl}/`);
  }
  
  public addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiurl}/add`, message);
  }

  public deleteMess(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/remove/${id}`);
  }


}
