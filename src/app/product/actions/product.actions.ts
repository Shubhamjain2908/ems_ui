import { Action } from '@ngrx/store';

export enum ProductActionTypes {
  GetProductList = '[Product] get list',
  GetProduct = '[Product] get category',
  UpdateProduct = '[Product] update category',
  CreateProduct = '[Product] create category',
  UploadProducts = '[Product] upload products',
  DeleteProduct = '[Product] delete category',
  GetProductSuccess = '[Product] get category success',
  GetProductListSuccess = '[Product] get list success',
  EmptyState = '[Product] empty state',
  SetSelectedProductId = '[Product] set selected category id',
  AddProductImage = '[Product] add product image',
  DeleteProductImage = '[Product] delete product image',
  AddProductVariantImage = '[Product] add product variant image',
  PatchProduct = '[Product] patch'
}

export class GetProductList implements Action {
  readonly type = ProductActionTypes.GetProductList;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetProduct implements Action {
  readonly type = ProductActionTypes.GetProduct;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class CreateProduct implements Action {
  readonly type = ProductActionTypes.CreateProduct;

  constructor(public payload: any, public options: any = {}) { }
}

export class UploadProducts implements Action {
  readonly type = ProductActionTypes.UploadProducts;

  constructor(public payload: any, public options: any = {}) { }
}

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UpdateProduct;

  constructor(public payload: any, public data: any, public options: any = {}) { }
}

export class DeleteProduct implements Action {
  readonly type = ProductActionTypes.DeleteProduct;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetProductListSuccess implements Action {
  readonly type = ProductActionTypes.GetProductListSuccess;

  constructor(public payload: any, public options: any = {}) { }
}

export class EmptyState implements Action {
  readonly type = ProductActionTypes.EmptyState;

  constructor() { }
}

export class SetSelectedProductId implements Action {
  readonly type = ProductActionTypes.SetSelectedProductId;

  constructor(public payload: any) { }
}

export class GetProductSuccess implements Action {
  readonly type = ProductActionTypes.GetProductSuccess;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class AddProductImage implements Action {
  readonly type = ProductActionTypes.AddProductImage;

  constructor(public productId: any, public data: any) { }
}

export class DeleteProductImage implements Action {
  readonly type = ProductActionTypes.DeleteProductImage;

  constructor(public productId: any, public id: any) { }
}

export class AddProductVariantImage implements Action {
  readonly type = ProductActionTypes.AddProductVariantImage;

  constructor(public productVariantId: any, public data: any, public options: any = {}) { }
}

export class PatchProduct implements Action {
  readonly type = ProductActionTypes.PatchProduct;

  constructor(public payload: any, public data: any, public options: any = {}) { }
}
