import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  public messages:Message [];
  public deleteMessage: Message;
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMessages();
  }
  public getMessages(): void {
   this.messageService.getMessages().subscribe(
     (response: Message[])=>{
       this.messages = response;
       console.log(this.messages);
     },
     (error:HttpErrorResponse) => {
       alert(error.message);
     }
   );
  }

  deleteMess(id){
    
    this.messageService.deleteMessage(id).subscribe();
  }
  public onAddMessage(addForm: NgForm): void {
    document.getElementById('add-message-form').click();
    this.messageService.addMessage(addForm.value).subscribe(
      (response: Message) => {
        console.log(response);
        this.getMessages();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onDeleteMessage(id: number): void {
    this.messageService.deleteMessage(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getMessages();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
