import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductsService } from '../shared/products.service';
import { Observable, Subject } from 'rxjs';
import { share, takeUntil } from 'rxjs/operators';
import Product from '../interfaces/product.interface';
import ProductEvent from "../interfaces/product-event.interface";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewChecked {

  private isFetching = true;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private products: Observable<Product[]> = this.productsService.fetchProducts().pipe(share());
  private events: Observable<ProductEvent[]> = this.productsService.getEvents();
  private isOpenEvents: boolean = false;

  @ViewChild('eventWrapper', { static: false }) eventWrapper: ElementRef;
  @ViewChild('eventsBtn', { static: false }) eventsBtn: ElementRef;

  @Output()
  public clickOutside = new EventEmitter();

  constructor(
    private productsService: ProductsService,
    private elementRef: ElementRef,
  ) {}


  @HostListener('document:click', ['$event.target'])
  public onClick(target) {
    if (!this.eventWrapper.nativeElement.contains(target) && target !== this.eventsBtn.nativeElement) {
      this.isOpenEvents = false;
    }
  }

  ngAfterViewChecked() {
  }

  onToggleEvents() {
    this.isOpenEvents = !this.isOpenEvents;
  }

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
    this.productsService.pushEvent(event.previousIndex);
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


