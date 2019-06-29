import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExpenseService {
  constructor(private http: BaseService) {
  }

  listing(data): Observable<any> {
    return this.http.get('expense', data);
  }

  add(data) {
    return this.http.post('expense', data);
  }

  update(data, id) {
    return this.http.put('expense/ ' + id, data);
  }

  delete(id) {
    return this.http.delete('expense/' + id);
  }

}
