import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Marque } from 'src/app/models/marque';
import { MarqueService } from 'src/app/service/marque.service';

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.css']
})
export class MarqueComponent implements OnInit {

  public marques:Marque[];
  public editMarque:Marque;
  public deleteMarque: Marque;
  constructor(private marqueService:MarqueService) { }

  ngOnInit(): void {
    this.getMarques();
  }
  public getMarques():void {
    this.marqueService.getMarques().subscribe(
      (response: Marque[])=>{
        this.marques = response;
        console.log(this.marques);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteMar(id){
    this.marqueService.deleteMarque(id).subscribe();
  }

  public onAddMarque(addForm: NgForm): void {
    document.getElementById('add-marque-form').click();
    this.marqueService.addMarque(addForm.value).subscribe(
      (response: Marque) => {
        console.log(response);
        this.getMarques();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateMarque(marque: Marque): void {
    this.marqueService.updateMarque(marque).subscribe(
      (response: Marque) => {
        console.log(response);
        this.getMarques();
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMarque(id: number): void {
    this.marqueService.deleteMarque(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getMarques();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(marque: Marque, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addMarqueModal');
    }
    if (mode === 'edit') {
      this.editMarque = marque;
      button.setAttribute('data-target', '#updateMarqueModal');
    }
    if (mode === 'delete') {
      this.deleteMarque = marque;
      button.setAttribute('data-target', '#deleteMarqueModal');
    }
    container.appendChild(button);
    button.click();
  }
  




}
