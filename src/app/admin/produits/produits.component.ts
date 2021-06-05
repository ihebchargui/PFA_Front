import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/service/panier.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  listUsers=[] ;
  prixTotale=0;
  data=[]
  listProduit:any;
  url="http://localhost:8081/daddesh/user/userImage/"
  constructor(public panierService:PanierService,public crudApi:ServiceService) { }

  ngOnInit() {
    this.panierService.getCommandes().subscribe(r=>{
     this.data=r;
      console.log(r);
      r.filter(e=>e.status==true)
      console.log(r);
      r.forEach(element => {
        console.log(this.listUsers.some(e => e.user.id === element.user.id));
        if(! this.listUsers.some(e => e.user.id === element.user.id)) {
          this.listUsers.push({user:element.user,produit:this.pushproduit(element.user.id)})
        }
     
        
      });
      console.log('rés',this.listUsers);
    })
  }
  pushproduit(id){
    
    const res=[]
    this.data.forEach(element => {
      if(element.user.id===id)
      res.push(element.produit)
    });
return res
  }





  onOpenModal(user ) {
    let filter={
      
    }


     filter=this.listUsers.filter(e=>{
      console.log(e.user,'comparééé',user.user)
     
      return  e.user===user.user
    })
    const tab =filter[0].produit
    tab.forEach(element => {
      this.prixTotale+=element.prix
      
    });
   console.log('filtér',filter);
   this.listProduit=tab;
    console.log(this.listProduit);

    // this.prixTotale=0;
    // this.listData.forEach(element => {
    //   this.prixTotale+=element.prix
      
    // });
    const container=document.getElementById('main-container');
    const button = document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#exampleModal');
    console.log(user);
   
    

    container.appendChild(button);
    button.click(); 
  }


/*
  onOpenModall( ) {
    
    const container=document.getElementById('main-container');
    const button = document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#exampleModall');
   
   
    

    container.appendChild(button);
    button.click(); 
  }
*/


}
