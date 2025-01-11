import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { cartReducer } from '../store/product.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ cart: cartReducer }),
    // provideState({ name: 'cart', reducer: cartReducer }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    provideAnimationsAsync()],
};
