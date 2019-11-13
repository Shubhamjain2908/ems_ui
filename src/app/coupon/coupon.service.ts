import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class CouponService {
  constructor(public baseService: BaseService, private router: Router) { }

  getCoupons(data: any = {}): Observable<any> {
    return this.baseService.getDirect<any>('coupons', data).pipe(
      map(result => result.data)
    );
  }

  getCoupon(couponId: any, data: any = {}): Observable<any> {
    return this.baseService.getDirect<any>(`coupon/${couponId}`, data).pipe(
      map(result => result.data)
    );
  }

  createCoupon(data: any): Observable<any> {
    return this.baseService.post<any>(`coupon`, data).pipe(
      map(result => result.data)
    );
  }

  updateCoupon(couponId: any, data: any = {}): Observable<any> {
    return this.baseService.put<any>(`coupon/${couponId}`, data).pipe(
      map(result => result.data)
    );
  }

  deleteCoupon(couponId: any): Observable<any> {
    return this.baseService.delete<any>(`coupon/${couponId}`).pipe(
      map(result => result)
    );
  }

  getCouponCodeSuggestion(data: any = {}): Observable<any> {
    return this.baseService.getDirect<any>('suggest-coupon-code', data).pipe(
      map(result => result.data)
    );
  }
}
