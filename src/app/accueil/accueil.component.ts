import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  public articles:Article [];
  constructor(public articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticles();
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
}
