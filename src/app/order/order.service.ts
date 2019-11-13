import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {
  constructor(public baseService: BaseService) { }

  getOrders(data: any = {}): Observable<any> {
    return this.baseService.getAdmin<any>('orders', data).pipe(
      map(result => result.data)
    );
  }

  getOrder(orderId: any, data: any = {}): Observable<any> {
    return this.baseService.getAdmin<any>(`order/${orderId}`, data).pipe(
      map(result => result.data)
    );
  }

  acceptOrderLine(orderId: any, orderLineId: any, data: any = {}): Observable<any> {
    return this.baseService.getAdmin<any>(`order/${orderId}/accept/${orderLineId}`, data).pipe(
      map(result => result.data)
    );
  }

  denyOrderLine(orderId: any, orderLineId: any, data: any = {}): Observable<any> {
    return this.baseService.getAdmin<any>(`order/${orderId}/deny/${orderLineId}`, data).pipe(
      map(result => result.data)
    );
  }
}
