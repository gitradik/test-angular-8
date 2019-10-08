import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Shared/products.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})

export class ProductsComponent implements OnInit {

  private isFetching = true;

  constructor(private productsService: ProductsService) { }

  onChange(id: number) {
    this.productsService.onToggle(id);
  }

  onClickRemove(id: number) {
    this.productsService.onRemove(id);
  }

  ngOnInit() {
    this.productsService.fetchProducts()
      .pipe(delay(500))
      .subscribe(() => {
      this.isFetching = false;
    });
  }

}


