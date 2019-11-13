import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AttributeService {
  constructor(public baseService: BaseService) { }

  getAttributes(data: any = {}): Observable<any> {
    return this.baseService.getDirect<any>('attributes', data).pipe(
      map(result => result.data)
    );
  }

  getAttribute(attributeId: any, data: any = {}): Observable<any> {
    return this.baseService.getDirect<any>(`attribute/${attributeId}`, data).pipe(
      map(result => result.data)
    );
  }

  createAttribute(data: any): Observable<any> {
    return this.baseService.post<any>(`attribute`, data).pipe(
      map(result => result.data)
    );
  }

  updateAttribute(attributeId: any, data: any): Observable<any> {
    return this.baseService.put<any>(`attribute/${attributeId}`, data).pipe(
      map(result => result.data)
    );
  }

  deleteAttribute(attributeId: any): Observable<any> {
    return this.baseService.delete<any>(`attribute/${attributeId}`).pipe(
      map(result => result)
    );
  }

  getAttributeChoices(attributeId: any, data: any = {}): Observable<any> {
    return this.baseService.getDirect<any>(`attribute/${attributeId}/attribute-choices`, data).pipe(
      map(result => result.data)
    );
  }

  createAttributeChoices(attributeId: any, data: any): Observable<any> {
    return this.baseService.post<any>(`attribute/${attributeId}/attribute-choice`, data).pipe(
      map(result => result.data)
    );
  }

  updateAttributeChoices(attributeChoiceId: any, data: any = {}): Observable<any> {
    return this.baseService.put<any>(`attribute-choice/${attributeChoiceId}`, data).pipe(
      map(result => result.data)
    );
  }

  deleteAttributeChoices(attributeChoiceId: any): Observable<any> {
    return this.baseService.delete<any>(`attribute-choice/${attributeChoiceId}`).pipe(
      map(result => result)
    );
  }

  getAttributeChoice(attributeChoiceId: any, data: any = {}): Observable<any> {
    return this.baseService.get<any>(`attribute-choice/${attributeChoiceId}`, data).pipe(
      map(result => result.data)
    );
  }
}
