import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { ProductsService } from '../shared/products.service';
import Product from '../interfaces/product.interface';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  private product: Product = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(pluck('prodId'))
      .subscribe(prodId => {
        console.log('>>>>>>>>>>>>>>>>>', prodId);
      });
  }
}
