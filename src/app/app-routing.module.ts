import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { MarqueComponent } from './admin/marque/marque.component';
import { MessageComponent } from './admin/message/message.component';
import { ModeleComponent } from './admin/modele/modele.component';
import { NavSideComponent } from './admin/nav-side/nav-side.component';
import { NavComponent } from './admin/nav/nav.component';
import { ProduitsComponent } from './admin/produits/produits.component';
import { ArticleComponent } from './article/article.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CommandeComponent } from './commande/commande.component';
import { ContactComponent } from './contact/contact.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { PanierComponent } from './panier/panier.component';
import { PieceComponent } from './piece/piece.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProduitgridComponent } from './produitgrid/produitgrid.component';
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
        { path: 'details', component: ProductListComponent },
        { path: ':id/details', component: ProductListComponent },
        {path: 'produitgrid', component:ProduitgridComponent},
        {path:'commande', component:CommandeComponent},
        {path: 'piece', component:PieceComponent},
        { path: 'piece/:nom', component: PieceComponent },
      ]

},
{ path: 'admin', component: NavSideComponent ,canActivate:[AdminGuard]
        
      },      
  { path: 'produit', component: ProduitsComponent },
  { path: 'nav', component: NavComponent },

  

{ path: 'login', component: SignInComponent },
{ path: 'register', component: SignUpComponent },
{path: 'scategorie', component: ScategorieComponent},
{path: 'categorie', component: CategorieComponent},
{path: 'article', component: ArticleComponent},
{path: 'message', component:MessageComponent},
{path: 'marque', component:MarqueComponent},
{path: 'modele', component:ModeleComponent},

 {path: 'accueil', component:AccueilComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
