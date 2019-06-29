import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {
  constructor(private http: BaseService) {
  }

  listing(data): Observable<any> {
    return this.http.get('category', data);
  }

  getSubCategory(data): Observable<any> {
    return this.http.get('subcategory', data);
  }

  getOneCategory(id): Observable<any> {
    return this.http.get('category/' + id);
  }

  add(data) {
    return this.http.post('category', data);
  }

  addSubcategory(data) {
    return this.http.post('subcategory', data);
  }

  update(data, id) {
    return this.http.put('category/ ' + id, data);
  }

  delete(id) {
    return this.http.delete('category/' + id);
  }

}
