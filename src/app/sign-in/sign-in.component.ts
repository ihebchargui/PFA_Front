import { Component, OnInit } from '@angular/core';
import { User } from '../auth/user';
import { NgForm } from '@angular/forms';

import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  closeResult = '';
  message='';
  user = new User();
  constructor(private service:AuthService, private router:Router) { }

  ngOnInit() {
  }
  loginUser(){
    
     
   this.service.login(this.user.emailId,this.user.password).subscribe(
     DataCue =>{
     if(this.user.emailId=='admin'){
      this.router.navigate(['admin'])
     }
     this.router.navigate(['boutique'])
           },
     error=> {    console.log("exeception occured",error ),
     this.message="please enter valid email and password "
          },
   )
  
  }





  
  GoToRegister(){
    this.router.navigate(['register'])
  }

 



  

}


