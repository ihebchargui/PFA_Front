import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavSideComponent } from './admin/nav-side/nav-side.component';
import { UsersComponent } from './admin/users/users.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSliderModule } from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';

import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { PanierComponent } from './panier/panier.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { RechComponent } from './rech/rech.component';
import { ContactComponent } from './contact/contact.component';
import { CategorieService } from './service/categorie.service';
import { ScategorieComponent } from './scategorie/scategorie.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ScategorieService } from './service/scategorie.service';
import { ProduitsComponent } from './admin/produits/produits.component';
import { ArticleComponent } from './article/article.component';
import { ContainerComponent } from './container/container.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NavComponent } from './admin/nav/nav.component';

const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BoutiqueComponent,
    SidebarComponent,
    FooterComponent,
    AddProduitComponent,
    SignInComponent,
    SignUpComponent,
    NavSideComponent,
    UsersComponent,
    HomeComponent,
    ProfileComponent,
    PanierComponent,
    RechComponent,
    ContactComponent,
    ScategorieComponent,
    CategorieComponent,
    ProduitsComponent,
    ArticleComponent,
    ContainerComponent,
    ProductListComponent,
    NavComponent,
    
  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,

    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),// ToastrModule added
  ],
  providers: [CategorieService,ScategorieService],
  bootstrap: [AppComponent],
  entryComponents: []

})
export class AppModule { }
