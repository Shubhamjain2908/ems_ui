import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  constructor(public baseService: BaseService) { }

  getProducts(data: any = {}): Observable<any> {
    return this.baseService.get<any>('products/seller', data).pipe(
      map(result => result.data)
    );
  }

  getProduct(productId: any, data: any = {}): Observable<any> {
    return this.baseService.get<any>(`product/${productId}`, data).pipe(
      map(result => result.data)
    );
  }

  createProduct(data: any): Observable<any> {
    return this.baseService.post<any>(`product`, data).pipe(
      map(result => result.data)
    );
  }

  uploadProduct(data: any) {
    const d = new FormData();
    console.log(data);
    d.append('file', data);
    return this.baseService.post('products/upload', d);
  }

  updateProduct(productId: any, data: any = {}): Observable<any> {
    return this.baseService.put<any>(`product/${productId}`, data).pipe(
      map(result => result.data)
    );
  }

  patchProduct(productId: any, data: any = {}): Observable<any> {
    return this.baseService.patch<any>(`product/${productId}`, data).pipe(
      map(result => result.data)
    );
  }

  deleteProduct(productId: any): Observable<any> {
    return this.baseService.delete<any>(`product/${productId}`).pipe(
      map(result => result)
    );
  }

  getUserList(data: any): Observable<any> {
    return this.baseService.getAdmin<any>('users', data).pipe(
      map(result => result.data)
    );
  }

  addProductImage(productId: any, data: any): Observable<any> {
    return this.baseService.post<any>(`product/image/${productId}`, data).pipe(
      map(result => result.data)
    );
  }

  deleteProductImage(productId: any, id: any): Observable<any> {
    return this.baseService.delete<any>(`product/${productId}/image/${id}`).pipe(
      map(result => result)
    );
  }

  addProductVariantImage(productVariantId: any, data: any): Observable<any> {
    return this.baseService.post<any>(`product-variant/image/${productVariantId}`, data).pipe(
      map(result => result.data)
    );
  }
}
