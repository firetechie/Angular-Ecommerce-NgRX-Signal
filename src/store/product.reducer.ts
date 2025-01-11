import { createReducer, on } from "@ngrx/store";
import { CartState, IProduct } from "../shared/models/product.model";
import * as ProductActions from "./product.action"

export const cartInitialState: CartState = {
    products: [],
    totalPrice: 0
}

export const calculateCartTotalPrice = (products: IProduct[]) => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0)
}

export const cartReducer = createReducer(cartInitialState,
    on(ProductActions.addToCart, (state, { product }) => {
        const updatedProducts = [...state.products, product]
        return {
            ...state,
            products: updatedProducts,
            totalPrice: calculateCartTotalPrice(updatedProducts)
        }
    }),
    on(ProductActions.incrementProduct, (state, { productId }) => {
        const updatedProducts = state.products.map((product) => product.id === productId ? { ...product, quantity: product.quantity + 1 } : product)
        return {
            ...state,
            products: updatedProducts,
            totalPrice: calculateCartTotalPrice(updatedProducts)
        }
    }),
    on(ProductActions.decrementProduct, (state, { productId }) => {
        const updatedProducts = state.products.map((product) => product.id === productId ? { ...product, quantity: product.quantity - 1 } : product)
        return {
            ...state,
            products: updatedProducts,
            totalPrice: calculateCartTotalPrice(updatedProducts)
        }
    }),
    on(ProductActions.removeProduct, (state, { productId }) => {
        const updatedProducts = state.products.filter((product) => product.id !== productId)
        return {
            ...state,
            products: updatedProducts,
            totalPrice: calculateCartTotalPrice(updatedProducts)
        }
    }),
)