import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class BaseService {

  public base_url: String = 'http://localhost:8641/api/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  get<T>(url: any, data: any = {}) {
    const token = this.cookieService.get('User');
    return this.http.get<T>(this.base_url + url, {
      headers: new HttpHeaders().set('Authorization', token),
      params: data
    });
  }

  post<T>(url: any, data: any) {
    const token = this.cookieService.get('User');
    return this.http.post<T>(this.base_url + url, data, {
      headers: new HttpHeaders().set('Authorization', token),
      withCredentials: true
    });
  }

  put<T>(url: any, data: any) {
    const token = this.cookieService.get('User');
    return this.http.put<T>(this.base_url + url, data, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  patch<T>(url: any, data: any) {
    const token = this.cookieService.get('User');
    return this.http.patch<T>(this.base_url + url, data, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  delete<T>(url: any) {
    const token = this.cookieService.get('User');
    return this.http.delete<T>(this.base_url + url, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  getDirect<T>(url: any, data: any = {}) {
    return this.http.get<T>(this.base_url + url, {
      params: data
    });
  }

  postDirect<T>(url: any, data: any) {
    return this.http.post<T>(this.base_url + url, data);
  }

  postDirectObserve<T>(url: any, data: any) {
    return this.http.post<T>(this.base_url + url, data, { observe: 'response' });
  }

}
