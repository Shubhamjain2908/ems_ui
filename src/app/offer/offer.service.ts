import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class OfferService {
  constructor(public baseService: BaseService, private router: Router) { }

  getOffers(data: any = {}): Observable<any> {
    return this.baseService.getDirect<any>('offers', data).pipe(
      map(result => result.data)
    );
  }

  getOffer(offerId: any, data: any = {}): Observable<any> {
    return this.baseService.getDirect<any>(`offer/${offerId}`, data).pipe(
      map(result => result.data)
    );
  }

  createOffer(data: any): Observable<any> {
    return this.baseService.post<any>(`offer`, data).pipe(
      map(result => result.data)
    );
  }

  updateOffer(offerId: any, data: any = {}): Observable<any> {
    return this.baseService.put<any>(`offer/${offerId}`, data).pipe(
      map(result => result.data)
    );
  }

  deleteOffer(offerId: any): Observable<any> {
    return this.baseService.delete<any>(`offer/${offerId}`).pipe(
      map(result => result)
    );
  }
}
