import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import * as uuid from 'uuid';

export interface Product {
  id: number;
  name: string;
  cost: number;
  active: boolean;
  date?: any;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  public products: Product[] = [
    { id: uuid.v4(), name: 'Iphone X', cost: 30000, active: false, date: new Date() },
    { id: uuid.v4(), name: 'Iphone 6', cost: 10000, active: true, date: new Date() },
    { id: uuid.v4(), name: 'Iphone 8', cost: 23000, active: false, date: new Date() },
  ];

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://jsonplaceholder.typicode.com/todos/')
      .pipe(tap(todos => {
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
    products.push(newProd);
  }

  onToggle(id: string) {
    const prod = this.products.find(el => el.id.toString() === id);
    prod.active = !prod.active;
  }

  onRemove(id: string) {
    this.products = this.products.filter(el => el.id.toString() !== id);
  }
}
