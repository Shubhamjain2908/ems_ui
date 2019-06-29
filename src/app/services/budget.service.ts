import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BudgetService {
  constructor(private http: BaseService) {
  }

  listing(data): Observable<any> {
    return this.http.get('budget', data);
  }

  add(data) {
    return this.http.post('budget', data);
  }

  update(data, id) {
    return this.http.put('budget/ ' + id, data);
  }

  delete(id) {
    return this.http.delete('budget/' + id);
  }

}
