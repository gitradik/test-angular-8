import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductsService } from '../shared/products.service';
import { Observable, Subject } from 'rxjs';
import { share, takeUntil } from 'rxjs/operators';
import Product from '../interfaces/product.interface';
import { ProductEventsComponent } from "../product-events/product-events.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent implements OnInit, OnDestroy {

  private isFetching = true;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private products: Observable<Product[]> = this.productsService.fetchProducts().pipe(share());

  @ViewChild(ProductEventsComponent, { static: false }) productEventsChild: ProductEventsComponent;

  constructor(
    private productsService: ProductsService
  ) {}

  onChange(id: number) {
    this.productsService.onToggle(id);
  }

  onClickRemove(id: number) {
    this.productsService.onRemove(id);
  }

  drop(event: CdkDragDrop<Product[]>) {
    const newProducts = [...this.productsService.getProducts().value];
    moveItemInArray(newProducts, event.previousIndex, event.currentIndex);
    this.products = this.productsService.setProducts(newProducts);
    this.productsService.pushEvent(event.previousIndex, event.currentIndex);
  }

  onChangeOrder(prods: Product[]) {
  }

  ngOnInit() {
    this.productsService.getProducts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(prods => { this.onChangeOrder(prods); });
    setTimeout(() => { this.isFetching = false; }, 0);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}


