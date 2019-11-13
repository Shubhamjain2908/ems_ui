import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class CategoryService {
    constructor(public baseService: BaseService, private router: Router) { }

    getCategories(data: any = {}): Observable<any> {
        return this.baseService.getDirect<any>('categories', data).pipe(
            map(result => result.data)
        );
    }

    getCategory(categoryId: any, data: any = {}): Observable<any> {
        return this.baseService.getDirect<any>(`category/${categoryId}`, data).pipe(
            map(result => result.data)
        );
    }

    createCategory(data: any): Observable<any> {
        return this.baseService.post<any>(`category`, data).pipe(
            map(result => result.data)
        );
    }

    updateCategory(categoryId: any, data: any = {}): Observable<any> {
        return this.baseService.put<any>(`category/${categoryId}`, data).pipe(
            map(result => result.data)
        );
    }

    deleteCategory(categoryId: any): Observable<any> {
        return this.baseService.delete<any>(`category/${categoryId}`).pipe(
            map(result => result)
        );
    }

    getVariantAttributes(categoryId): Observable<any> {
        return this.baseService.getDirect<any>(`category/${categoryId}/variant-attribute`).pipe(
            map(result => result.data)
        );
    }
}
