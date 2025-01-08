import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { IProduct } from '../../shared/models/product.model';
import { ProductsService } from '../../services/products.service';

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

  constructor() {
    this.http = inject(HttpClient)
    this.productService = inject(ProductsService)
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts() as Observable<IProduct[]>;
  }
}
