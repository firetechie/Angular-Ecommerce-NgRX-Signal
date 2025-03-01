import { Component, OnInit, computed, inject, linkedSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, IProduct } from '../../shared/models/product.model';
import { Store } from '@ngrx/store';
import { selectCartProducts, selectCartTotal } from '../../ngrx-store/cart/cart.selector';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { incrementProduct, decrementProduct, removeProduct } from '../../ngrx-store/cart/cart.action';
import { CartStore } from '../../signal-store/cart.store';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartProducts$ !: Observable<IProduct[]>
  cartTotalPrice$ !: Observable<number>

  // ngrx signals() store
  cartStore = inject(CartStore)
  deliveryCharges = computed<number>(() => {
    return this.cartStore.totalPrice() > 100 ? 29 : 0
  })
  totalCartPrice = linkedSignal<number>(() => {
    return this.cartStore.totalPrice() + this.deliveryCharges();
  })

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.cartProducts$ = this.store.select(selectCartProducts)
    this.cartTotalPrice$ = this.store.select(selectCartTotal)
  }

  increment(productId: number): void {
    this.store.dispatch(incrementProduct({ productId }))
  }

  decrement(productId: number): void {
    this.store.dispatch(decrementProduct({ productId }))
  }

  removeProduct(productId: number): void {
    this.store.dispatch(removeProduct({ productId }))
  }
}
