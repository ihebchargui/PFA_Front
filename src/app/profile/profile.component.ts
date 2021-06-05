import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser;
  url;
  user; 
  constructor(public authApi:AuthService) { }

  ngOnInit() {

    this.loggedUser=this.authApi.getLoggedUser();
    this.url="http://localhost:8081/daddesh/user/userImage/"
    this.authApi.getUserInfo().subscribe(res=>{
      console.log(res);
      this.user=res;
    })
  }
  submit(){
    this.authApi.updateUser(this.user).subscribe(r=>{
      console.log(r)
      window.location.reload();
    })
  }

}
