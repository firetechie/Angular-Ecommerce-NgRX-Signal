import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { AppState, IProduct } from '../../shared/models/product.model';
import { ProductsService } from '../../services/products.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/product.action';
import { selectCartProducts } from '../../store/product.selector';

@Component({
  selector: 'app-products',
  imports: [CommonModule, AsyncPipe, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  http: any;
  error !: any;
  products$!: Observable<IProduct[]>
  productService: ProductsService;
  cartProducts$ !: Observable<IProduct[]>;

  constructor(private store: Store<AppState>) {
    this.http = inject(HttpClient)
    this.productService = inject(ProductsService)
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts() as Observable<IProduct[]>;
    this.cartProducts$ = this.store.select(selectCartProducts)
  }

  addItemToCart(product: IProduct): void {
    this.store.dispatch(addToCart({ product }))
  }
}
