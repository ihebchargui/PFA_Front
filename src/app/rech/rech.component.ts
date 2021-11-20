import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Marque } from 'src/app/models/marque';
import { MarqueService } from 'src/app/service/marque.service';
@Component({
  selector: 'app-rech',
  templateUrl: './rech.component.html',
  styleUrls: ['./rech.component.css']
})
export class RechComponent implements OnInit {
  public marques:Marque[];
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

}
