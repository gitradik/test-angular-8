import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ProductsService } from '../Shared/products.service';
import { delay } from 'rxjs/operators';
import Product from '../interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})

export class ProductsComponent implements OnInit {

  private isFetching = true;

  constructor(private productsService: ProductsService) {
  }

  onChange(id: number) {
    this.productsService.onToggle(id);
  }

  onClickRemove(id: number) {
    this.productsService.onRemove(id);
  }

  drop(event: CdkDragDrop<Product[]>) {
    moveItemInArray(this.productsService.products, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    this.productsService.fetchProducts()
      .pipe(delay(500))
      .subscribe(() => {
        this.isFetching = false;
      });
  }
}


