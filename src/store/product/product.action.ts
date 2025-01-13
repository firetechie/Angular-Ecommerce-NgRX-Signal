import { createAction, props } from '@ngrx/store'
import { IProduct } from '../../shared/models/product.model';

export const loadProducts = createAction('[Product Component] LoadProducts');
export const loadProductsSuccess = createAction('[Product Component] LoadProductsSuccess', props<{ products: IProduct[] }>());
export const loadProductsFailure = createAction('[Product Component] LoadProductsFailure', props<{ errorMessage: string }>());
