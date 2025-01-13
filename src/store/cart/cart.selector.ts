import { createSelector } from "@ngrx/store";
import { AppState, CartState } from "../../shared/models/product.model";


export const selectCartState = (state: AppState) => state.cart

export const selectCartProducts = createSelector(selectCartState, (state: CartState) => state.products)
export const selectCartTotal = createSelector(selectCartState, (state: CartState) => state.totalPrice)