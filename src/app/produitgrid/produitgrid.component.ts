import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { Modele } from '../models/modele';
import { Scategorie } from '../models/scategorie';
import { ArticleService } from '../service/article.service';
import { ModeleService } from '../service/modele.service';
import { ScategorieService } from '../service/scategorie.service';

@Component({
  selector: 'app-produitgrid',
  templateUrl: './produitgrid.component.html',
  styleUrls: ['./produitgrid.component.css']
})
export class ProduitgridComponent implements OnInit {
  inputnumber = 1;
  plus()
  {
   this.inputnumber = this.inputnumber+1;
  }
  minus()
  {
    if(this.inputnumber != 1)
  {
   this.inputnumber = this.inputnumber-1;
  }
  
  }
  listScategories=[] ;
  data=[]


  public modeles:Modele[];
  public articles:Article [];
  public editArticle:Article;
  public deleteArticle: Article;
  ScategorieList: Scategorie[];
  public scategories:Scategorie [];
  constructor(public articleService: ArticleService,private scategorieService:ScategorieService,private modeleService:ModeleService) { }

  ngOnInit(): void {
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
  
  
  
  this.getModeles();
    this.getArticles();
    this.getScategories();
  }
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


  public searchArticles(key: string): void {
    console.log(key);
    const results: Article[] = [];
    for (const article of this.articles) {
      if (article.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1 || article.scategorie.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1 || article.modele.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1)
       {
        results.push(article);
      }
    }
    this.articles = results;
    if (results.length === 0 || !key) {
      this.getArticles();
    }
    }

    

}
