import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaymentsService {
  constructor(public baseService: BaseService) { }

  getPayments(data: any = {}): Observable<any> {
    return this.baseService.getAdmin<any>('payments', data).pipe(
      map(result => result.data)
    );
  }

  getPayment(paymentId: any, data: any = {}): Observable<any> {
    return this.baseService.getAdmin<any>(`payments/${paymentId}`, data).pipe(
      map(result => result.data)
    );
  }


  getUserList(data: any): Observable<any> {
    return this.baseService.getAdmin<any>('users', data).pipe(
      map(result => result.data)
    );
  }
}
