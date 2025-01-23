import { createReducer, on } from "@ngrx/store";
import { ProductState } from "../../shared/models/product.model";
import * as ProductActions from '../product/product.action'

export const intialProductState: ProductState = {
    products: [],
    error: ''
}

export const productReducer = createReducer(intialProductState,
    on(ProductActions.loadProductsSuccess, (state, { products }) => ({
        ...state,
        products,
        error: null
    })),
    on(ProductActions.loadProductsFailure, (state, { errorMessage }) => ({
        ...state,
        error: errorMessage
    }))
)