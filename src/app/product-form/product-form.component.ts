import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Shared/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {
  productName: '';
  isValid = false;

  constructor(private productsService: ProductsService) { }

  onChangeProductName() {
    this.isValid = this.productName !== '';
  }

  sendProductName() {
    const { productsService, productName } = this;
    productsService.addProduct(productName);
  }

  ngOnInit() {
  }

}