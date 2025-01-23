import { computed } from '@angular/core';
import { IProduct } from '../shared/models/product.model';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { calculateCartTotalPrice } from '../ngrx-store/cart/cart.reducer';

export interface CartState {
    products: IProduct[];
}

const initialCartState: CartState = {
    products: []
}

export const CartStore = signalStore(
    { providedIn: 'root' },
    withState(initialCartState),
    withComputed(({ products }) => ({
        totalPrice: computed(() => calculateCartTotalPrice(products()))
    })),
    withMethods(({ products, ...store }) => ({
        addToCart(product: IProduct) {
            const updatedProducts = [...products(), product]
            patchState(store, { products: updatedProducts })
        },
        removeProduct(id: number) {
            const updatedProducts = products().filter((p) => p.id !== id)
            patchState(store, { products: updatedProducts })
        },
        increment(id: number) {
            const updatedProducts = products().map((p) => p.id === id ? { ...p, quantity: p.quantity + 1 } : p)
            patchState(store, { products: updatedProducts })
        },
        decrement(id: number) {
            const updatedProducts = products().map((p) => p.id === id ? { ...p, quantity: p.quantity - 1 } : p)
            patchState(store, { products: updatedProducts })
        }
    }))
)