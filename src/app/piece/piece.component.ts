import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article';
import { Scategorie } from '../models/scategorie';
import { ArticleService } from '../service/article.service';
import { ScategorieService } from '../service/scategorie.service';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  listScategories=[] ;
  data=[]


  
  public articles:Article [];
  public editArticle:Article;
  public deleteArticle: Article;
  ScategorieList: Scategorie[];
  public scategories:Scategorie [];
  constructor(public articleService: ArticleService,private scategorieService:ScategorieService,private route:ActivatedRoute) { }

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
  this.route.params.subscribe(routeParams => {
    this.getArticles(routeParams.nom);
	});
 
  console.log('ihabb',this.route.snapshot.paramMap.get('nom'))
  
  this.getScategories();

  }
  public getArticles(id):void{
    this.articleService.getArticles().subscribe(
      (response: Article[])=>{
        if(this.route.snapshot.paramMap.get('nom')==='undefined'||this.route.snapshot.paramMap.get('nom')===''){
            this.articles=response;}
            else
            this.articles=response.filter(art =>art.nom==id)
       
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
        console.log('sc',this.scategories);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
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

