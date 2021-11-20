import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgForm, Validators } from '@angular/forms';
import { Marque } from 'src/app/models/marque';
import { Modele } from 'src/app/models/modele';
import { MarqueService } from 'src/app/service/marque.service';
import { ModeleService } from 'src/app/service/modele.service';

@Component({
  selector: 'app-modele',
  templateUrl: './modele.component.html',
  styleUrls: ['./modele.component.css']
})
export class ModeleComponent implements OnInit {
  listMarques=[] ;
  data=[]
  public MarqueList: Marque[];
  public modeles:Modele[];
  public editModele:Modele;
  public deleteModele: Modele;
  
  constructor(private marqueService:MarqueService,private modeleService:ModeleService,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.modeleService.getModeles().subscribe(r=>{
      this.data=r;
       
       r.forEach(element => {
         console.log(this.listMarques.some(e => e.marque.id === element.marque.id));
         if(! this.listMarques.some(e => e.marque.id === element.marque.id)) {
           this.listMarques.push({marque:element.marque})
         }
      
         
       });
       console.log('rés',this.listMarques);
     })







    this.getModeles();
    if (this.modeleService.choixmenu == "A")
    {this.infoForm()};
    this.marqueService.getMarques().subscribe(
      response =>{this.MarqueList = response;}
      );
  }

  infoForm() {
    this.modeleService.dataForm = this.fb.group({
        id: null,
        nom: ['', [Validators.required]],
        id_marque: ['', [Validators.required]],
        nom_marque: ['', [Validators.required]],
        
      });
    }



  public getModeles():void {
    this.modeleService.getModeles().subscribe(
      (response: Modele[])=>{
        this.modeles = response;
        console.log(this.modeles);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteMod(id){
    this.modeleService.deleteModele(id).subscribe();
  }

  public onAddModele(addForm: NgForm): void {
    const val=addForm.value;
    
    
    const data = {
      ...addForm.value,
      marque:{
        id:val.id
      }
    }
    document.getElementById('add-modele-form').click();
    this.modeleService.addModele(data).subscribe(
      (response: Modele) => {
        console.log(response);
        this.getModeles();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateModele(modele: Modele): void {
    this.modeleService.updateModele(modele).subscribe(
      (response: Modele) => {
        console.log(response);
        this.getModeles();
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteModele(id: number): void {
    this.modeleService.deleteModele(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getModeles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(modele: Modele, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addModeleModal');
    }
    if (mode === 'edit') {
      this.editModele = modele;
      button.setAttribute('data-target', '#updateModeleModal');
    }
    if (mode === 'delete') {
      this.deleteModele = modele;
      button.setAttribute('data-target', '#deleteModeleModal');
    }
    container.appendChild(button);
    button.click();
  }
  




}

