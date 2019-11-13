import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class AWSService {
    constructor(private http: BaseService) { }

    uploadFile(data: any) {
        const d = new FormData();
        d.append('file', data);
        return this.http.post('upload/file', d);
    }
}
