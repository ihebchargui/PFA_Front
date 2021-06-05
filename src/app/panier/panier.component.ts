import { Component, OnInit } from '@angular/core';
import { Command } from 'protractor';
import { AuthService } from '../service/auth.service';
import { PanierService } from '../service/panier.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor(public authApi:AuthService,public crudApi:ServiceService,
    public panierServ: PanierService) { }
 listData =[] ;
 user;
 prixTotale=0;
 loggedUser;
  ngOnInit() {
    console.log(this.listData);
    this.loggedUser=this.authApi.getLoggedUser();
    
    if(!this.loggedUser){
      this.getfromlocal();
    }
      else{
        
        this.authApi.getUserInfo().subscribe(res=>{
          this.user=res
              })
              
        this.panierServ.getCommandes( ).subscribe(res=>{
          console.log('ras',res);
          res.forEach(element => {
           const obj={...element.produit,CommandeId:element.id};
            this.listData.push(obj);
          });
         
          console.log('listdata',this.listData)
        });
      }
  }
  getfromlocal(){
    this.listData=JSON.parse(localStorage.getItem('produits'));
    console.log('fromlocal',this.listData);
   }
   delete(id){
     if(this.loggedUser)
     this.panierServ.deleteCommande(id).subscribe();
     else{
      console.log('délétin from local',localStorage.getItem('produits'))
        }
   }
   onOpenModal(produit ) {

    this.prixTotale=0;
    this.listData.forEach(element => {
      this.prixTotale+=element.prix
      
    });
    const container=document.getElementById('main-container');
    const button = document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#exampleModal');
    console.log(produit);
   
    

    container.appendChild(button);
    button.click(); }

    confimerAchat(){
      const data={
        ...this.user,
        produit :this.listData

      }
     

    }


}
