import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TagService {
  constructor(public baseService: BaseService, private router: Router) { }

  getTags(data: any = {}): Observable<any> {
    return this.baseService.getDirect<any>('tags', data).pipe(
      map(result => result.data)
    );
  }

  getTag(tagId: any, data: any = {}): Observable<any> {
    return this.baseService.getDirect<any>(`tag/${tagId}`, data).pipe(
      map(result => result.data)
    );
  }

  createTag(data: any): Observable<any> {
    return this.baseService.post<any>(`tag`, data).pipe(
      map(result => result.data)
    );
  }

  updateTag(tagId: any, data: any = {}): Observable<any> {
    return this.baseService.put<any>(`tag/${tagId}`, data).pipe(
      map(result => result.data)
    );
  }

  deleteTag(tagId: any): Observable<any> {
    return this.baseService.delete<any>(`tag/${tagId}`).pipe(
      map(result => result)
    );
  }
}
