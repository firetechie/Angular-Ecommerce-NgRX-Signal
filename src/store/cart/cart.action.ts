import { createAction, props } from '@ngrx/store'
import { IProduct } from '../../shared/models/product.model';

export const addToCart = createAction('[Cart Component] AddCart', props<{ product: IProduct }>());
export const incrementProduct = createAction('[Cart Component] IncrementProduct', props<{ productId: number }>());
export const decrementProduct = createAction('[Cart Component] DecrementProduct', props<{ productId: number }>());
export const removeProduct = createAction('[Cart Component] RemoveProduct', props<{ productId: number }>());