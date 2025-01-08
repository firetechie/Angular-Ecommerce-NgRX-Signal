import { createReducer, on } from "@ngrx/store";
import { IProduct } from "../shared/models/product.model";
import * as ProductActions from "./product.action"

export interface CartState {
    products: IProduct[];
}

export const cartInitialState: CartState = {
    products: []
}

export const cartReducer = createReducer(cartInitialState,
    on(ProductActions.addToCart, (state, { product }) => {
        const updatedProducts = [...state.products, product]
        return {
            ...state,
            products: updatedProducts
        }
    }),
    on(ProductActions.incrementProduct, (state, { productId }) => {
        const updatedProducts = state.products.map((product) => product.id === productId ? { ...product, quantity: product.quantity + 1 } : product)
        return {
            ...state,
            products: updatedProducts
        }
    }),
    on(ProductActions.decrementProduct, (state, { productId }) => {
        const updatedProducts = state.products.map((product) => product.id === productId ? { ...product, quantity: product.quantity - 1 } : product)
        return {
            ...state,
            products: updatedProducts
        }
    }),
    on(ProductActions.removeProduct, (state, { productId }) => {
        const updatedProducts = state.products.filter((product) => product.id !== productId)
        return {
            ...state,
            products: updatedProducts
        }
    }),
)