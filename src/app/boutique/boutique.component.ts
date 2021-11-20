import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import {Router} from '@angular/router' ; 
import { FormBuilder,Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { PanierService } from '../service/panier.service';
import { Article } from '../models/article';
import { Scategorie } from '../models/scategorie';
import { ArticleService } from '../service/article.service';
import { ScategorieService } from '../service/scategorie.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css']
})
export class BoutiqueComponent implements OnInit {
  /************************************************************ */

  listScategories=[] ;
  data=[]


  
  public articles:Article [];
  public editArticle:Article;
  public deleteArticle: Article;
  ScategorieList: Scategorie[];
  public scategories:Scategorie [];

  /*********************************************************** */
  loggedUser ; 
  user ; 
  addProduit = this.fb.group({
    nom: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
    category: ['',],
    produit: [''],
    type: ['',],
    signin: [''],
  });
  image;
  produitSelected="" ; 
  CategorySelected="";
  listData=[] ; 
  listDataFilter=[] ; 
  produit= null ;
  signin= null ;

  
  produits  = ['Chaussures' ,'Sacs', "Accessoires"] ;
  femmeChaussures=['Bottes',"Bottines","Escarpins","Compensées","Sandales","Baskets",
    "Espadrilles","Slip-on", "Ballerines","Mules","Derbies"]
  femmeSacs=["Sac à main","Sac à bandoulière","Pochette","Sac à dos","Couffin","Portefeuille","Porte-monnaie",
    "Cartable"];
  femmeAccessoires=["Lunettes","Ceinture","Accessoires pour Cheveux","Collant",
      "Chaussettes","Chapeau","Bonnet","Echarpe","Foulard"];
  fillesChaussures=["Chaussures bébés filles","Ballerines","Baskets","Bottes","Chaussons",
      "Sandales"];
  fillesSacs=["Sacs bébés filles","Sacs à dos","Sacs à main","Cartables","Etuis à crayons"];
  fillesAccessoires=["Accessoires de cheveux","Bijoux","Chapeaux","Ceintures","Collants","Echarpes",
      "Lunettes",];
  garconsChaussures=["Chaussures bébés garçons","Baskets","Bottes","Chaussons","Mocassins","Sandales"];
  garconsSacs=["Sacs bébés garçons"," Sacs à dos"," Sacs de sport"," Cartables","Etuis à crayons"];
  garconsAccessoires=["Ceintures","Chapeaux","Cravates","Echarpes","Noeuds papillon","Lunettes"];

  constructor(public crudApi: ServiceService,public authApi:AuthService ,private router: Router,private fb: FormBuilder,public sv:ServiceService ,
    /************************************** */
    public articleService: ArticleService,private scategorieService:ScategorieService,
    /************************************* */
    public panierServ:PanierService
    ) { }

  ngOnInit() {
    
    this.loggedUser=this.authApi.getLoggedUser();
    this.getloggedUser() ;
   
    if(this.router.url!=='/boutique'){
        this.getfromlocal();
        
    }
    else{
    this.getData();
    console.log(this.listData);
  }

  /********************************************************* */
  this.articleService.getArticles().subscribe(r=>{
    this.data=r;
     console.log(r);
     
     r.forEach(element => {
       console.log(this.listScategories.some(e => e.scategorie.id === element.scategorie.id));
       if(! this.listScategories.some(e => e.scategorie.id === element.scategorie.id)) {
         this.listScategories.push({scategorie:element.scategorie})
       }
    
       
     });
     console.log('rés',this.listScategories);
   })


/***********************************************/




  this.getArticles();

 
  /*************************************************************** */
}
  onSelectCategory(event){
    this.CategorySelected=event.target.value;
    this.listDataFilter=this.listData.filter(res=>res.category==event.target.value);

  }
  onSelectProduit(event){
    this.produitSelected=event.target.value;
    this.listDataFilter=this.listData.filter(res=>res.produit==event.target.value);
  }
  getfromlocal(){
   this.listData=JSON.parse(localStorage.getItem('produits'));
   
   this.listDataFilter=this.listData;
  }
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.listData = response;
        console.log(response);
        this.listDataFilter=this.listData;
      }
     );
   
  }
  onOpenModal(produit ) {
    this.produit=produit ;
    const container=document.getElementById('main-container');
    const button = document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#exampleModal');
    console.log(produit);
    this.crudApi.getImages(produit.id).subscribe(
      response =>{this.image=response;
      }
     );
    

    container.appendChild(button);
    button.click(); }



   /* onOpenModall(signin ) {
      this.signin=signin ;
      const container=document.getElementById('main-container');
      const button = document.createElement('button');
      button.type='button';
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      button.setAttribute('data-target','#exampleModall');
      console.log(signin);
      this.crudApi.getImages(signin.id).subscribe(
        response =>{this.image=response;
        }
       );
      
  
      container.appendChild(button);
      button.click(); }*/

    addPanier(produit){
      if(!this.loggedUser)
        this.addtoLocalPanier(produit)
        else{
         const data = {produit :produit,user :this.user}; 
          this.panierServ.addCommande(data).subscribe(r=>{
            this.router.navigate(['boutique/panier'])
          });

        }

        
    }
    getloggedUser(){
      this.authApi.getUserInfo().subscribe(res=>{
        this.user=res ; 
      })
    }
    updateUrl($event){
     
    }
    addtoLocalPanier(produit){
      const data=JSON.parse(localStorage.getItem('produits'));
      if(data==null){
        const tabdata = [produit];
        localStorage.setItem('produits',JSON.stringify(tabdata));
      }else{
      data.push(produit);
      localStorage.setItem('produits',JSON.stringify(data));
    }
    this.router.navigate(['boutique/panier'])
    
    }



/************************************************** */




/***************************************************************/

public getArticles():void{
  this.articleService.getArticles().subscribe(
    (response: Article[])=>{
      this.articles = response;
      console.log(this.articles);
    },
    (error:HttpErrorResponse) => {
      alert(error.message);
    }
  );
}


public searchArticles(key: string): void {
  console.log(key);
  const results: Article[] = [];
  for (const article of this.articles) {
    if (article.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1)
     {
      results.push(article);
    }
  }
  this.articles = results;
  if (results.length === 0 || !key) {
    this.getArticles();
  }
  }
  
/************************************************** */

}