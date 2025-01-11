import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, IProduct } from '../shared/models/product.model';
import { selectCartProducts } from '../store/product.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ngrx-ecommerce';
  cartProducts$ !: Observable<IProduct[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.cartProducts$ = this.store.select(selectCartProducts)
  }
}
