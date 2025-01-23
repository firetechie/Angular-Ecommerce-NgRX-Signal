import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { cartReducer } from '../ngrx-store/cart/cart.reducer';
import { productReducer } from '../ngrx-store/product/product.reducer';
import { ProductEffect } from '../ngrx-store/product/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ cart: cartReducer, product: productReducer }),
    // provideState({ name: 'cart', reducer: cartReducer }),
    // provideState({ name: 'product', reducer: productReducer }),
    provideEffects(ProductEffect),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    provideAnimationsAsync()],
};
