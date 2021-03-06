import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { JwPaginationComponent } from 'jw-angular-pagination';

import { ProductsService } from './shared/products.service';
import { AccountService } from './shared/account.service';
import { ProductEventsComponent } from './product-events/product-events.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    NotFoundComponent,
    ProductFormComponent,
    SignUpComponent,
    SignInComponent,
    JwPaginationComponent,
    ProductEventsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
  ],
  providers: [
    ProductsService,
    AccountService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
