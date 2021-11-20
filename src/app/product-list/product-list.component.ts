import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  routeSub ;
  public articles:Article ;
  constructor( private route:ActivatedRoute,private articleService:ArticleService ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
    });
    this.getArticles();
  }
  public getArticles():void{
    this.articleService.getArticles().subscribe(
      (response: Article[])=>{
       
       const art= response.filter(art =>art.id==parseInt(this.route.snapshot.paramMap.get('id')))
       this.articles= art[0]
        console.log("ihebbbbbbbbbbbbbbbbbbbbb",this.route.snapshot.paramMap.get('id'));
        console.log("ihebbbbbbbbbbbbbbbbbbbbb",this.articles);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
