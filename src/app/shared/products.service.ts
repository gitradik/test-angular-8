import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Product from '../interfaces/product.interface';
import ProductEvent from '../interfaces/product-event.interface';

@Injectable()
export class ProductsService {
  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private events: BehaviorSubject<ProductEvent[]> = new BehaviorSubject<ProductEvent[]>([]);

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.events;
  }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:4200/assets/products.json')
      .pipe(tap(products => this.products.next(products)));
  }

  getProducts(): BehaviorSubject<Product[]> {
    return this.products;
  }

  setProducts(products: Product[]) {
    this.products.next(products);
    return this.products;
  }

  pushEvent(previousIndex: number, currentIndex: number) {
    const previousProd = this.getProducts().value[previousIndex];
    const currentProd = this.getProducts().value[currentIndex];
    if(previousProd && currentProd) {
      const events = [...this.events.value];
      events.push({
        previous: {
          id: previousProd.id, name: previousProd.name, date: new Date()
        },
        current: {
          id: currentProd.id, name: currentProd.name, date: new Date()
        }
      });
      this.events.next(events);
    }
  }

  onToggle(id: number): void {
    const prod = this.products.value.find(el => el.id === id);
    if(prod) {
      prod.active = !prod.active;
    }
  }

  onRemove(id: number): void {
    const { products } = this;
    products.next(products.value.filter(el => el.id !== id));
  }
}
