import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import {ProductsComponent} from './products/products.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SignUpComponent} from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
