import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomersService {
  constructor(private _http: HttpClient, private http: BaseService) {
  }

  listing(data): Observable<any> {
    return this.http.getAdmin('customers', data);
  }

  todaysListing(data): Observable<any> {
    return this.http.getAdmin('customers/today', data);
  }
  add(data) {
    return this.http.postAdmin('create-customer', data);
  }

  updateCustomer(data, id) {
    return this.http.putAdmin('update-customer?id=' + id, data);
  }

  customer_details(data): Observable<any> {
    return this.http.getAdmin('customer?id=' + data.id);
  }

  getCategories(): Observable<any> {
    return this.http.get('/categories?level=0');
  }

  block(data) {
    return this.http.getAdmin('customers/block', { customerId: data.id });
  }

  unblock(data) {
    return this.http.getAdmin('customers/unblock', { customerId: data.id });
  }
  update(data) {
    return this.http.putAdmin('admin/category', data);
  }

  delete(id) {
    return this.http.deleteAdmin('admin/category/' + id);
  }

  approve(data) {
    return this.http.getAdmin('customers/approve', { customerId: data.id });
  }

}
