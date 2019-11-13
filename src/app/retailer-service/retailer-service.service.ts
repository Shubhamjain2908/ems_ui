import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RetailerServiceService {
  constructor(public baseService: BaseService) { }

  getRetailerServices(data: any = {}): Observable<any> {
    return this.baseService.get<any>('retailer/service', data).pipe(
      map(result => result.data)
    );
  }

  getRetailerService(serviceId: any, data: any = {}): Observable<any> {
    data.eager = '[images,category,retailer]';
    return this.baseService.get<any>(`retailer/service/${serviceId}`, data).pipe(
      map(result => result.data)
    );
  }

  createRetailerService(data: any): Observable<any> {
    return this.baseService.post<any>(`retailer/service`, data).pipe(
      map(result => result.data)
    );
  }

  updateRetailerService(serviceId: any, data: any = {}): Observable<any> {
    return this.baseService.put<any>(`retailer/service/${serviceId}`, data).pipe(
      map(result => result.data)
    );
  }

  patchRetailerService(serviceId: any, data: any = {}): Observable<any> {
    return this.baseService.patch<any>(`retailer/service/${serviceId}`, data).pipe(
      map(result => result.data)
    );
  }

  deleteRetailerService(serviceId: any): Observable<any> {
    return this.baseService.delete<any>(`retailer/service/${serviceId}`).pipe(
      map(result => result)
    );
  }

  getUserList(data: any): Observable<any> {
    return this.baseService.getAdmin<any>('users', data).pipe(
      map(result => result.data)
    );
  }

  addRetailerServiceImage(serviceId: any, data: any): Observable<any> {
    return this.baseService.post<any>(`service/image/${serviceId}`, data).pipe(
      map(result => result.data)
    );
  }

  addRetailerServiceVariantImage(serviceVariantId: any, data: any): Observable<any> {
    return this.baseService.post<any>(`service-variant/image/${serviceVariantId}`, data).pipe(
      map(result => result.data)
    );
  }
}
