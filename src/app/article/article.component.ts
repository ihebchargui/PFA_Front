import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Article } from '../models/article';
import { Modele } from '../models/modele';
import { Scategorie } from '../models/scategorie';
import { ArticleService } from '../service/article.service';
import { ModeleService } from '../service/modele.service';
import { ScategorieService } from '../service/scategorie.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  /*
  imgURL: any=[];
  userFile :any=[] ;
  public message: string;
  public imagePath;
   */
  listScategories=[] ;
  listModeles=[] ;
  data=[]


  
  public articles:Article [];
  public editArticle:Article;
  public deleteArticle: Article;
  ScategorieList: Scategorie[];
  ModeleList: Modele[];
  public scategories:Scategorie [];
  constructor(public articleService: ArticleService,private scategorieService:ScategorieService,private modeleService: ModeleService ,public fb: FormBuilder) { }

  ngOnInit(): void {
    
/***********************************************/
    this.articleService.getArticles().subscribe(r=>{
      this.data=r;
       console.log(r);
       
       r.forEach(element => {
         console.log(this.listScategories.some(e => e.scategorie.id === element.scategorie.id));
         if(! this.listScategories.some(e => e.scategorie.id === element.scategorie.id)) {
           this.listScategories.push({scategorie:element.scategorie})
         }
      
         
       });

       r.forEach(element => {
        console.log(this.listModeles.some(e => e.modele.id === element.modele.id));
        if(! this.listModeles.some(e => e.modele.id === element.modele.id)) {
          this.listModeles.push({modele:element.modele})
        }
     
        
      });
       console.log('rés',this.listScategories);
     })


/***********************************************/




    this.getArticles();

    if (this.articleService.choixmenu == "A")
    {this.infoForm()};
    this.scategorieService.getScategories().subscribe(
      response =>{this.ScategorieList = response;}
      );
      this.modeleService.getModeles().subscribe(
        response =>{this.ModeleList = response;}
        );
  }

  infoForm() {
    this.articleService.dataForm = this.fb.group({
        id: null,
        nom: ['', [Validators.required]],
        codeArticle: ['', [Validators.required]],
        description: ['', [Validators.required]],
        remise: ['', [Validators.required]],
        prix: ['', [Validators.required]],
        id_scategorie: ['', [Validators.required]],
        nom_scategorie: ['', [Validators.required]],
        id_modele: ['', [Validators.required]],
        nom_modele: ['', [Validators.required]],
        
      });
    }
   



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
  
  
  
  deleteArt(id){
    
    this.articleService.deleteArticle(id).subscribe();
    
  }
  
  
  /************************/
  
  public onAddArticle(addForm: NgForm): void {
    const val=addForm.value;
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',val)
    
    const data = {
      ...addForm.value,
      scategorie:{
        id:val.id_scategorie

      },
      modele:{
        id:val.id_modele
      }
    }
  document.getElementById('add-article-form').click();
  this.articleService.addArticle(data).subscribe(
    (response: Article) => {
      console.log(response);
      this.getArticles();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  );
  }
  

  public onUpdateArticle(article: Article): void {
    
    this.articleService.updateArticle(article).subscribe(
      (response: Article) => {
        console.log(response);
        this.getArticles();
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
  
  public onDeleteArticle(id: number): void {
  this.articleService.deleteArticle(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getArticles();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
  }
  
  
  
  
  
  
  
  
  
  
  
  public onOpenModal(article: Article, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addArticleModal');
  }
  if (mode === 'edit') {
    this.editArticle = article;
    button.setAttribute('data-target', '#updateArticleModal');
  }
  if (mode === 'delete') {
    this.deleteArticle = article;
    button.setAttribute('data-target', '#deleteArticleModal');
  }
  container.appendChild(button);
  button.click();
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
  


/*


onSelectFile(event) {
    
  if (event.target.files.length > 0)
  {
    console.log(event.target.files);
    const files = event.target.files ; 
    [...files].forEach(file => {
      
    
    
    this.userFile.push(file) ;
   // this.f['profile'].setValue(file);

  var mimeType = file.type;*/
 // if (mimeType.match(/image\/*/) == null) {
   /* this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();
  
  this.imagePath = file;
  reader.readAsDataURL(file); 
  reader.onload = (_event) => { 
    this.imgURL.push(reader.result)  ; 
  }
});
}}
/***************************************** */











}
