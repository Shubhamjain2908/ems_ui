import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { ProductActions } from '../actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { LoaderActions } from 'app/shared/actions';
import { Router } from '@angular/router';
import * as alertFunctions from '../../shared/data/sweet-alerts';

@Injectable()
export class ProductEffect {
  constructor(private action$: Actions, private service: ProductService, private router: Router) { }

  @Effect()
  getCategories$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<ProductActions.GetProductList>(ProductActions.ProductActionTypes.GetProductList),
      switchMap(data => {
        let limit = Number(data.payload.limit) || 10;
        limit = limit + 1;
        return this.service.getProducts({ ...data.payload, limit: limit }).pipe(
          mergeMap(result => {
            const actions = [];
            if (result.length < limit - 1) {
              actions.push(new LoaderActions.DisablePage())
            } else {
              result.splice(result.length - 1, 1)
              actions.push(new LoaderActions.EnablePage())
            }
            actions.push(new ProductActions.GetProductListSuccess(result))
            return actions
          }),
        );
      })
    )

  @Effect()
  getProduct$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<ProductActions.GetProduct>(ProductActions.ProductActionTypes.GetProduct),
      switchMap(action => {
        return this.service.getProduct(action.payload, action.data).pipe(
          map(result => new ProductActions.GetProductSuccess(result)),
        )
      })
    )

  @Effect({ dispatch: false })
  createProduct$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<ProductActions.CreateProduct>(ProductActions.ProductActionTypes.CreateProduct),
      map(action => action.payload),
      tap(data => {
        this.service.createProduct(data).subscribe({
          next: x => this.router.navigate(['/product/detail', x.id])
        })
      })
    )

  @Effect({ dispatch: false })
  uploadProducts$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<ProductActions.UploadProducts>(ProductActions.ProductActionTypes.UploadProducts),
      map(action => action.payload),
      tap(data => {
        this.service.uploadProduct(data).subscribe({
          complete: () => alertFunctions.typeCustom('Success!', 'Products uploaded!', 'success'),
          next: x => this.router.navigate(['/product']),
          error: x => alertFunctions.typeCustom('Error!', 'Error! Invalid File uploaded', 'error')
        })
      })
    )

  @Effect({ dispatch: false })
  updateProduct$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<ProductActions.UpdateProduct>(ProductActions.ProductActionTypes.UpdateProduct),
      tap((action: any) => {
        return this.service.updateProduct(action.payload, action.data).subscribe({
          next: x => this.router.navigate(['/product/detail', x.id])
        })
      })
    )

  @Effect()
  patchProduct$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<ProductActions.PatchProduct>(ProductActions.ProductActionTypes.PatchProduct),
      switchMap(action => {
        return this.service.patchProduct(action.payload, action.data).pipe(
          map(result => new ProductActions.GetProduct(result.id)),
        )
      })
    )

  @Effect()
  deleteProduct$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<ProductActions.DeleteProduct>(ProductActions.ProductActionTypes.DeleteProduct),
      switchMap(action => {
        return this.service.deleteProduct(action.payload).pipe(
          map(result => new ProductActions.GetProductList(action.options)),
        )
      })
    )

  @Effect()
  addProductImage$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<ProductActions.AddProductImage>(ProductActions.ProductActionTypes.AddProductImage),
      switchMap(action => {
        return this.service.addProductImage(action.productId, action.data).pipe(
          map(result => new ProductActions.GetProduct(action.productId))
        )
      })
    )

  @Effect()
  deleteProductImage$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<ProductActions.DeleteProductImage>(ProductActions.ProductActionTypes.DeleteProductImage),
      switchMap(action => {
        return this.service.deleteProductImage(action.productId, action.id).pipe(
          map(result => new ProductActions.GetProduct(action.productId))
        )
      })
    )

  @Effect()
  addProductVariantImage$ = (): Observable<Action> =>
    this.action$.pipe(
      ofType<ProductActions.AddProductVariantImage>(ProductActions.ProductActionTypes.AddProductVariantImage),
      switchMap(action => {
        return this.service.addProductVariantImage(action.productVariantId, action.data).pipe(
          map(result => new ProductActions.GetProduct(action.options.productId))
        )
      })
    )
}
