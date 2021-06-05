import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { NavSideComponent } from './admin/nav-side/nav-side.component';
import { NavComponent } from './admin/nav/nav.component';
import { ProduitsComponent } from './admin/produits/produits.component';
import { ArticleComponent } from './article/article.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ContactComponent } from './contact/contact.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { PanierComponent } from './panier/panier.component';
import { ProfileComponent } from './profile/profile.component';
import { ScategorieComponent } from './scategorie/scategorie.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'boutique'
  },
  {path:'boutique',component:HomeComponent,
      children: [
        { path: '', component: BoutiqueComponent },
        // { path: 'panier', component:  BoutiqueComponent },
        { path: 'addproduit', component: AddProduitComponent },
        { path: 'login', component: SignInComponent , canActivate:[AuthGuard] },
        { path: 'register', component: SignUpComponent ,canActivate:[AuthGuard]},
        { path: 'profile', component: ProfileComponent },
        { path: 'panier', component: PanierComponent },
        { path: 'contact', component: ContactComponent },

      ]

},
{ path: 'admin', component: NavSideComponent ,canActivate:[AdminGuard]},

  { path: 'produit', component: ProduitsComponent },
  { path: 'nav', component: NavComponent },

  

{ path: 'login', component: SignInComponent },
{ path: 'register', component: SignUpComponent },
{path: 'scategorie', component: ScategorieComponent},
{path: 'categorie', component: CategorieComponent},
{path: 'article', component: ArticleComponent},



 


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
