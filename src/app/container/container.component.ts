import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Marque } from '../models/marque';
import { Categorie } from '../models/categorie';
import { MarqueService } from '../service/marque.service';
import { CategorieService } from '../service/categorie.service';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  public categories:Categorie [];
  public marques:Marque[];
  constructor(private categorieService:CategorieService, private marqueService:MarqueService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getMarques();
  }
  public getCategories():void{
    this.categorieService.getCategories().subscribe(
      (response: Categorie[])=>{
        this.categories = response;
        console.log('sc',this.categories);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
