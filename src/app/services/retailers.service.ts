import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RetailersService {
  constructor(private _http: HttpClient, private http: BaseService) {
  }

  listing(data): Observable<any> {
    return this.http.getAdmin('retailers', data);
  }

  todaysListing(data): Observable<any> {
    return this.http.getAdmin('retailers/today', data);
  }
  add(data) {
    return this.http.postAdmin('create-retailer', data);
  }

  updateRetailer(data, id) {
    return this.http.putAdmin('update-retailer?id=' + id, data);
  }

  retailer_details(data): Observable<any> {
    return this.http.getAdmin('retailer?id=' + data.id);
  }

  getCategories(): Observable<any> {
    return this.http.get('/categories?level=0');
  }

  block(data) {
    return this.http.getAdmin('retailers/block', { retailerId: data.id });
  }

  unblock(data) {
    return this.http.getAdmin('retailers/unblock', { retailerId: data.id });
  }
  update(data) {
    return this.http.putAdmin('admin/category', data);
  }

  delete(id) {
    return this.http.deleteAdmin('admin/category/' + id);
  }

  approve(data) {
    return this.http.getAdmin('retailers/approve', { retailerId: data.id });
  }

}
