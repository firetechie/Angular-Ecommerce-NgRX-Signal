import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { AppState, IProduct } from '../../shared/models/product.model';
import { ProductsService } from '../../services/products.service';
import { Store } from '@ngrx/store';
import { selectCartProducts } from '../../ngrx-store/cart/cart.selector';
import { addToCart } from '../../ngrx-store/cart/cart.action';
import * as ProductActions from '../../../src/ngrx-store/product/product.action'
import * as ProductSelectors from '../../../src/ngrx-store/product/product.selector'
import { CartStore } from '../../signal-store/cart.store';

@Component({
  selector: 'app-products',
  imports: [CommonModule, AsyncPipe, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  http: any;
  error$ !: Observable<string | null>;
  products$!: Observable<IProduct[]>
  productService: ProductsService;
  cartProducts$ !: Observable<IProduct[]>;
  cartStore = inject(CartStore)

  constructor(private store: Store<AppState>) {
    this.http = inject(HttpClient)
    this.productService = inject(ProductsService)
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts())
    this.products$ = this.store.select(ProductSelectors.selectAllProducts)
    this.error$ = this.store.select(ProductSelectors.selectProductError)
    this.cartProducts$ = this.store.select(selectCartProducts)
  }

  addItemToCart(product: IProduct): void {
    // this.store.dispatch(addToCart({ product }))
    this.cartStore.addToCart(product);
  }
}
