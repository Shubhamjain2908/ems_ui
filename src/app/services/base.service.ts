import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class BaseService {

  // public admin_url: String = 'http://localhost:3000/api/v1/admin/';
  // public base_url: String = 'http://localhost:3000/api/v1/';
  public admin_url: String = 'http://3.18.102.208/api/v1/admin/';
  public base_url: String = 'http://3.18.102.208/api/v1/';
  // public base_url: String = 'http://18.217.202.65/api/';


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

  getAdmin<T>(url: any, data: any = {}) {
    const token = this.cookieService.get('User');
    return this.http.get<T>(this.admin_url + url, {
      headers: new HttpHeaders().set('Authorization', token),
      params: data
    });
  }

  postAdmin<T>(url: any, data: any) {
    const token = this.cookieService.get('User');
    return this.http.post<T>(this.admin_url + url, data, {
      headers: new HttpHeaders().set('Authorization', token),
      withCredentials: true
    });
  }

  putAdmin<T>(url: any, data: any) {
    const token = this.cookieService.get('User');
    return this.http.put<T>(this.admin_url + url, data, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  patchAdmin<T>(url: any, data: any) {
    const token = this.cookieService.get('User');
    return this.http.patch<T>(this.admin_url + url, data, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  deleteAdmin<T>(url: any) {
    const token = this.cookieService.get('User');
    return this.http.delete<T>(this.admin_url + url, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  getDirectAdmin<T>(url: any, data: any = {}) {
    return this.http.get<T>(this.admin_url + url, {
      params: data
    });
  }

  postDirectAdmin<T>(url: any, data: any) {
    return this.http.post<T>(this.admin_url + url, data);
  }

  postDirectAdminObserve<T>(url: any, data: any) {
    return this.http.post<T>(this.admin_url + url, data, { observe: 'response' });
  }

}
