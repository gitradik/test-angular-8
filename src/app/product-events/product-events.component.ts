import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import {Observable} from "rxjs";
import ProductEvent from "../interfaces/product-event.interface";
import { ProductsService } from "../shared/products.service";

@Component({
  selector: 'app-product-events',
  templateUrl: './product-events.component.html',
  styleUrls: ['./product-events.component.sass']
})
export class ProductEventsComponent implements OnInit {

  private events: Observable<ProductEvent[]> = this.productsService.getEvents();
  private isView: boolean = false;

  @ViewChild('eventWrapper', { static: false }) eventWrapper: ElementRef;
  @ViewChild('eventsBtn', { static: false }) eventsBtn: ElementRef;

  constructor(private productsService: ProductsService) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(target) {
    if (!this.eventWrapper.nativeElement.contains(target) && target !== this.eventsBtn.nativeElement) {
      this.isView = false;
    }
  }

  onClickView(isOnlyClose: boolean = false) {
    if(isOnlyClose) {
      this.isView = false;
    } else {
      this.isView = !this.isView;
    }
  }

  ngOnInit() {
  }

}
