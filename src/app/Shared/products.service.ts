import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import * as uuid from 'uuid';
import Product from '../interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  public products: Product[] = [];

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:4200/assets/products.json')
      .pipe(tap(products => {
        this.products = products;
      }));
  }

  addProduct(name: string) {
    const { products } = this;
    const newProd = {
      id: uuid.v4(),
      name,
      cost: 50000,
      active: false,
      date: new Date(),
    };
  }

  onToggle(id: number) {
    const prod = this.products.find(el => el.id === id);
    prod.active = !prod.active;
  }

  onRemove(id: number) {
    this.products = this.products.filter(el => el.id !== id);
  }
}
