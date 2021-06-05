import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedUser ; 
  url ; 
  image ;
  listData =[] ;
  user;
  prixTotale=0;
  constructor(public authApi:AuthService, public router:Router) { }


  ngOnInit() {
    this.loggedUser=this.authApi.getLoggedUser();
    this.url="http://localhost:8081/daddesh/user/userImage/"
    
   this.image=this.url+this.loggedUser;
  }
  signout(){
    this.authApi.doLogoutUser();
    
  }


  onOpenModal(signin ) {

  
    const container=document.getElementById('main-container');
    const button = document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#exampleModal');
    console.log(signin);
   
    

    container.appendChild(button);
    button.click(); }
  
 
}
