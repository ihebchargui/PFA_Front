import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categorie } from 'src/app/models/categorie';
import { Scategorie } from 'src/app/models/scategorie';
import { AuthService } from 'src/app/service/auth.service';
import { CategorieService } from 'src/app/service/categorie.service';
import { ScategorieService } from 'src/app/service/scategorie.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public categories:Categorie [];
  public editCategorie:Categorie;
  public deleteCategorie: Categorie;
  /***********************************************************************/
  public scategories:Scategorie [];
  public editScategorie:Scategorie;
  public deleteScategorie: Scategorie;

  constructor(public authService:AuthService, private categorieService:CategorieService, private scategorieService:ScategorieService) { }
listUsers ;
user; 
/*
listCategories =[];
categorie; */


url="http://localhost:8081/daddesh/user/userImage/"
  ngOnInit() {
    this.authService.getallUsers().subscribe(r=>{
      this.listUsers=r ; 
      console.log(r);
    });
    /*
    this.categorieService.getAll().subscribe(r=>{
      this.listCategories=r ; 
      console.log(r);
    });*/

    this.getCategories();
    this.getScategories();

  }

  public getCategories():void{
    this.categorieService.getCategories().subscribe(
      (response: Categorie[])=>{
        this.categories = response;
        console.log(this.categories);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  delete(id){
    
    this.authService.deleteUser(id).subscribe();
    
  }

  deleteCat(id){
    
    this.categorieService.deleteCategorie(id).subscribe();
    
  }
/*
  updateCat(categorie :Categorie):void{
this.categorieService.updateCategorie(categorie).subscribe(
);
  }*/
  
/************************/

public onAddCategorie(addForm: NgForm): void {
  document.getElementById('add-categorie-form').click();
  this.categorieService.addCategorie(addForm.value).subscribe(
    (response: Categorie) => {
      console.log(response);
      this.getCategories();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  );
}

public onUpdateCategorie(categorie: Categorie): void {
  this.categorieService.updateCategorie(categorie).subscribe(
    (response: Categorie) => {
      console.log(response);
      this.getCategories();
      window.location.reload();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
/*
submit(){
  this.categorieService.updateCategorie(this.categorie).subscribe(r=>{
    console.log(r)
    window.location.reload();
  })
}

*/
public onDeleteCategorie(id: number): void {
  this.categorieService.deleteCategorie(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getCategories();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}










  
public onOpenModal(categorie: Categorie, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addCategorieModal');
  }
  if (mode === 'edit') {
    this.editCategorie = categorie;
    button.setAttribute('data-target', '#updateCategorieModal');
  }
  if (mode === 'delete') {
    this.deleteCategorie = categorie;
    button.setAttribute('data-target', '#deleteCategorieModal');
  }
  container.appendChild(button);
  button.click();
}


public searchCategories(key: string): void {
  console.log(key);
  const results: Categorie[] = [];
  for (const categorie of this.categories) {
    if (categorie.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1)
     {
      results.push(categorie);
    }
  }
  this.categories = results;
  if (results.length === 0 || !key) {
    this.getCategories();
  }
}

/*******************************************************************************/
public getScategories():void{
  this.scategorieService.getScategories().subscribe(
    (response: Scategorie[])=>{
      this.scategories = response;
      console.log(this.scategories);
    },
    (error:HttpErrorResponse) => {
      alert(error.message);
    }
  );
}



deleteScat(id){
  
  this.scategorieService.deleteScategorie(id).subscribe();
  
}


/************************/

public onAddScategorie(addForm: NgForm): void {
document.getElementById('add-scategorie-form').click();
this.scategorieService.addScategorie(addForm.value).subscribe(
  (response: Scategorie) => {
    console.log(response);
    this.getScategories();
    addForm.reset();
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
    addForm.reset();
  }
);
}

public onUpdateScategorie(scategorie: Scategorie): void {
this.scategorieService.updateScategorie(scategorie).subscribe(
  (response: Scategorie) => {
    console.log(response);
    this.getScategories();
    window.location.reload();
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
);
}

public onDeleteScategorie(id: number): void {
this.scategorieService.deleteScategorie(id).subscribe(
  (response: void) => {
    console.log(response);
    this.getScategories();
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
);
}











public onOpenModall(scategorie: Scategorie, mode: string): void {
const container = document.getElementById('main-container');
const button = document.createElement('button');
button.type = 'button';
button.style.display = 'none';
button.setAttribute('data-toggle', 'modal');
if (mode === 'add') {
  button.setAttribute('data-target', '#addScategorieModal');
}
if (mode === 'edit') {
  this.editScategorie = scategorie;
  button.setAttribute('data-target', '#updateScategorieModal');
}
if (mode === 'delete') {
  this.deleteScategorie = scategorie;
  button.setAttribute('data-target', '#deleteScategorieModal');
}
container.appendChild(button);
button.click();
}


public searchScategories(key: string): void {
console.log(key);
const results: Scategorie[] = [];
for (const scategorie of this.scategories) {
  if (scategorie.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1)
   {
    results.push(scategorie);
  }
}
this.scategories = results;
if (results.length === 0 || !key) {
  this.getScategories();
}
}








}

