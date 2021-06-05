import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../auth/user';
import { ServiceService } from '../service/service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public imagePath;
  imgURL: any=[];
  userFile :any=[] ;
  message='';
  user = new User();
  constructor(private service:ServiceService, private router:Router,private toastr: ToastrService) { }

  ngOnInit() {
  }
  register(){
    const data=this.user;
    const formData = new  FormData();

    formData.append('user',JSON.stringify(data));
    this.userFile.forEach((element,i) => {
      formData.append('file[]',element);
    });
    
   this.service.registerUser(formData).subscribe(
     DataCue =>{  console.log("reponse recieved"),
    
     this.toastr.success('Votre compte est créer!', 'Toastr fun!'),
     this.router.navigate(['login'])
           },
     error=> {    console.log("exeception occured",error),
     this.message="please enter valid email and password "
     this.toastr.error('mail est déja utilisé', 'Toastr fun!');
          },
   )
  }
  onSelectFile(event) {
    
    if (event.target.files.length > 0)
    {
      console.log(event.target.files);
      const files = event.target.files ; 
      [...files].forEach(file => {
        
      
      
      this.userFile.push(file) ;
     // this.f['profile'].setValue(file);
 
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL.push(reader.result)  ; 
    }
  });
  }
  
}

}
