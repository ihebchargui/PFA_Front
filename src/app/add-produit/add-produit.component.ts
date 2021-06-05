import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ServiceService } from '../service/service.service';
@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {
  public imagePath;
  imgURL: any=[];
  userFile :any=[] ;
  public message: string;
  produitSelected="" ; 
  CategorySelected="";
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



  addProduit = this.fb.group({
    nom: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
    category: ['',],
    produit: [''],
    type: ['',],
    prix: ['',],
   
  });

  constructor(private fb: FormBuilder,public sv:ServiceService) {
    

   }

  ngOnInit(): void {
   
    
      
  }
  onSelectCategory(event){
    this.CategorySelected=event.target.value;

  }
  onSelectProduit(event){
    console.log(event.target.value);
    this.produitSelected=event.target.value;
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
  onSubmit(){
    console.log(this.addProduit.value);
    console.log("first",this.userFile)
    const data=this.addProduit.value;
    const formData = new  FormData();

    formData.append('produit',JSON.stringify(data));
    this.userFile.forEach((element,i) => {
      formData.append('file[]',element);
    });
   
    console.log(formData.get("produit"));
    
    console.log('file[] : ',formData.get("file[]"));
    console.log('file[0] : ',formData.get("file[0]"));
    console.log(formData.get("file[1]"));
    this.sv.createProduit(formData).subscribe((r)=>{
      console.log(r);
          })
  
    


  }

}