import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SuppliersService {
  constructor(private _http: HttpClient, private http: BaseService) {
  }

  listing(data): Observable<any> {
    return this.http.getAdmin('suppliers', data);
  }

  supplier_details(data): Observable<any> {
    return this.http.getAdmin('supplier?id=' + data.id);
  }

  updateSupplier(data, id) {
    return this.http.putAdmin('update-supplier?id=' + id, data);
  }


  getSupplierTypes(): Observable<any> {
    return this.http.get('supplier/supplier-type');
  }

  getCategories(): Observable<any> {
    return this.http.get('categories?level=0');
  }

  todaysListing(data): Observable<any> {
    return this.http.getAdmin('suppliers/today', data);
  }

  add(data) {
    return this.http.postAdmin('create-supplier', data);
  }

  block(data) {
    return this.http.getAdmin('suppliers/block', { supplierId: data.id });
  }

  unblock(data) {
    return this.http.getAdmin('suppliers/unblock', { supplierId: data.id });
  }
  update(data) {
    return this.http.putAdmin('admin/category', data);
  }

  delete(id) {
    return this.http.deleteAdmin('admin/category/' + id);
  }

  approve(data) {
    return this.http.getAdmin('suppliers/approve', { supplierId: data.id });
  }

}
