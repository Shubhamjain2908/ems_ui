import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class BannerService {
    constructor(public baseService: BaseService, private router: Router) { }

    getBanners(data: any = {}): Observable<any> {
        return this.baseService.getDirect<any>('banners', data).pipe(
            map(result => result.data)
        );
    }

    getBanner(bannerId: any, data: any = {}): Observable<any> {
        return this.baseService.getDirect<any>(`banner/${bannerId}`, data).pipe(
            map(result => result.data)
        );
    }

    createBanner(data: any): Observable<any> {
        return this.baseService.post<any>(`banner`, data).pipe(
            map(result => result.data)
        );
    }

    updateBanner(bannerId: any, data: any = {}): Observable<any> {
        return this.baseService.put<any>(`banner/${bannerId}`, data).pipe(
            map(result => result.data)
        );
    }

    deleteBanner(bannerId: any): Observable<any> {
        return this.baseService.delete<any>(`banner/${bannerId}`).pipe(
            map(result => result)
        );
    }
}
