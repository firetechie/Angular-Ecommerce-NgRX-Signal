import { inject, Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { ProductsService } from "../../services/products.service";
import * as ProductActions from '../product/product.action'
import { catchError, switchMap, of, map } from 'rxjs';

@Injectable()
export class ProductEffect {
    actions$: any
    service: ProductsService;
    loadProduct$: any;

    constructor() {
        this.actions$ = inject(Actions)
        this.service = inject(ProductsService)

        this.loadProduct$ = createEffect(() =>
            this.actions$.pipe(ofType(ProductActions.loadProducts),
                switchMap(() => this.service.getProducts().pipe(map((res) => ProductActions.loadProductsSuccess({ products: res })),
                    catchError((error: { errorMessage: string }) =>
                        of(ProductActions.loadProductsFailure({ errorMessage: error.errorMessage }))))
                ))
        )
    }

}