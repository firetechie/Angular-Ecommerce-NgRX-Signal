import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, IProduct } from '../shared/models/product.model';
import { selectCartProducts } from '../ngrx-store/cart/cart.selector';
import { CommonModule } from '@angular/common';
import { CartStore } from '../signal-store/cart.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ngrx-ecommerce';
  cartProducts$ !: Observable<IProduct[]>;
  cartStore = inject(CartStore)

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.cartProducts$ = this.store.select(selectCartProducts)
  }
}
