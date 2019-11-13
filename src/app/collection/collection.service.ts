import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class CollectionService {
  constructor(public baseService: BaseService, private router: Router) { }

  getCollections(data: any = {}): Observable<any> {
    return this.baseService.getDirect<any>('collections', data).pipe(
      map(result => result.data)
    );
  }

  getCollection(collectionId: any, data: any = {}): Observable<any> {
    return this.baseService.getDirect<any>(`collection/${collectionId}`, data).pipe(
      map(result => result.data)
    );
  }

  createCollection(data: any): Observable<any> {
    return this.baseService.post<any>(`collection`, data).pipe(
      map(result => result.data)
    );
  }

  updateCollection(collectionId: any, data: any = {}): Observable<any> {
    return this.baseService.put<any>(`collection/${collectionId}`, data).pipe(
      map(result => result.data)
    );
  }

  deleteCollection(collectionId: any): Observable<any> {
    return this.baseService.delete<any>(`collection/${collectionId}`).pipe(
      map(result => result)
    );
  }
}
