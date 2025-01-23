import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        loadComponent: () => import('./../components/products/products.component').then((c) => c.ProductsComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import('./../components/cart/cart.component').then((c) => c.CartComponent)
    },
    {
        path: 'checkout',
        loadComponent: () => import('../components/checkout/checkout.component').then((c) => c.CheckoutComponent)
    }
];
