import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgForm, Validators } from '@angular/forms';
import { Categorie } from '../models/categorie';
import { Scategorie } from '../models/scategorie';
import { CategorieService } from '../service/categorie.service';
import { ScategorieService } from '../service/scategorie.service';

@Component({
  selector: 'app-scategorie',
  templateUrl: './scategorie.component.html',
  styleUrls: ['./scategorie.component.css']
})
export class ScategorieComponent implements OnInit {

  listCategories=[] ;
  data=[]


  
  public scategories:Scategorie [];
  public editScategorie:Scategorie;
  public deleteScategorie: Scategorie;
  CategorieList: Categorie[];
  public categories:Categorie [];
  constructor(public categorieService: CategorieService,private scategorieService:ScategorieService,public fb: FormBuilder) { }

  ngOnInit(): void {

/***********************************************/
    this.scategorieService.getScategories().subscribe(r=>{
      this.data=r;
       console.log(r);
       
       r.forEach(element => {
         console.log(this.listCategories.some(e => e.categorie.id === element.categorie.id));
         if(! this.listCategories.some(e => e.categorie.id === element.categorie.id)) {
           this.listCategories.push({categorie:element.categorie})
         }
      
         
       });
       console.log('rés',this.listCategories);
     })


/***********************************************/




    this.getScategories();
    

    if (this.scategorieService.choixmenu == "A")
    {this.infoForm()};
    this.categorieService.getCategories().subscribe(
      response =>{this.CategorieList = response;}
      );
  }

  infoForm() {
    this.scategorieService.dataForm = this.fb.group({
        id: null,
        nom: ['', [Validators.required]],
        id_categorie: ['', [Validators.required]],
        nom_categorie: ['', [Validators.required]],
        
      });
    }


    




  /***************************************************************/

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
    const val=addForm.value;
    
    
    const data = {
      ...addForm.value,
      categorie:{
        id:val.id
      }
    }
  document.getElementById('add-scategorie-form').click();
  this.scategorieService.addScategorie(data).subscribe(
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
  

  public onUpdateScategorie(scategorie: Scategorie,nom): void {

    console.log('dadwaaaaaaaaaaaaaaaaaaaaaaawawaada',scategorie)
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


  /*public onUpdateScategorie(scategorie: Scategorie): void {
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
  }*/
  
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
  
  
  
  
  
  
  
  
  
  
  
  public onOpenModal(scategorie: Scategorie, mode: string): void {
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
    if (scategorie.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1 || scategorie.categorie.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1)

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
