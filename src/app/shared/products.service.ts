import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Product from '../interfaces/product.interface';

@Injectable()
export class ProductsService {
  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

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

  onToggle(id: number): void {
    const prod = this.products.value.find(el => el.id === id);
    prod.active = !prod.active;
  }

  onRemove(id: number): void {
    const { products } = this;
    products.next(products.value.filter(el => el.id !== id));
  }
}
