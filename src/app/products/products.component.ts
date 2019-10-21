import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductsService } from '../shared/products.service';
import Product from '../interfaces/product.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})

export class ProductsComponent implements OnInit, OnDestroy {

  private isFetching = true;
  private subscribes: Subscription[] = [];
  private subProducts: Observable<Product[]> = this.productsService.fetchProducts();

  constructor(private productsService: ProductsService) {}

  onChange(id: number) {
    this.productsService.onToggle(id);
  }

  onClickRemove(id: number) {
    this.productsService.onRemove(id);
  }

  drop(event: CdkDragDrop<Product[]>) {
    const products = [ ...this.productsService.products.getValue() ];
    moveItemInArray(products, event.previousIndex, event.currentIndex);
    this.productsService.products.next(products);
    this.subProducts.next(products);
  }

  onChangeOrder(prods: Product[]) {
    console.log('>>>>>>>>>>>>>>>>>>>>', prods);
  }

  ngOnInit(): void {
    this.subscribes.push(
      this.productsService.products.subscribe((prods) => this.onChangeOrder(prods) )
    );
    this.isFetching = false;
  }

  ngOnDestroy(): void {
    this.subscribes.forEach(sub => sub.unsubscribe());
  }
}


