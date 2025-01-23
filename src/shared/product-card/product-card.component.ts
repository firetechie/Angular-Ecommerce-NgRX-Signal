import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IProduct } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CartStore } from '../../signal-store/cart.store';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product!: IProduct;
  @Input() cartProducts$!: Observable<IProduct[]>;
  @Output() handleCart: EventEmitter<any> = new EventEmitter<any>();
  existingCartProduct !: boolean;
  cartProductsSubscription !: any;
  cartStore = inject(CartStore)

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.cartProductsSubscription =
      this.cartProducts$.subscribe((products) => {
        this.existingCartProduct = products.some((p) => this.product.id === p.id)
      })
  }

  addToCart(product: IProduct): void {
    this.handleCart.emit(product);
    setTimeout(() => {
      this.router.navigate(['/cart']);
    }, 500);
  }

  ngOnDestroy(): void {
    this.cartProductsSubscription?.unsubscribe();
  }
}
