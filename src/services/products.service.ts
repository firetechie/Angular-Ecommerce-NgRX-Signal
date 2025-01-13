import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from '../shared/models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  http: HttpClient;

  constructor() { this.http = inject(HttpClient) }

  getProducts() {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products').pipe(map((products) => {
      return products.map((product) => {
        return { ...product, quantity: 1 }
      })
    }))
  }
}
