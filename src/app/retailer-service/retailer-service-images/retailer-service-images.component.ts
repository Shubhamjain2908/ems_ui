import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../reducers';
import { RetailerServiceActions } from '../actions';
import { AWSService } from 'app/services/aws.service';

@Component({
  selector: 'app-retailer-service-images',
  templateUrl: './retailer-service-images.component.html',
  styleUrls: ['./retailer-service-images.component.scss']
})
export class RetailerServiceImagesComponent implements OnInit {

  service$: Observable<any>;
  serviceId: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private awsService: AWSService) {
    this.service$ = this.store.pipe(select(fromStore.getRetailerService));
  }

  ngOnInit() {
    this.service$.subscribe({
      next: value => {
        if (!value) {
          this.store.dispatch(new RetailerServiceActions.GetRetailerService(this.route.snapshot.paramMap.get('serviceId')))
        } else {
          this.serviceId = value.id
        }
      }
    })
  }

  getVariantValueMap(atrributes: any[]) {
    return atrributes.map(r => r.value)
  }

  fileChangeListener(event: any, type = 0, id: any = null) {
    if (event.files.length > 0) {
      this.awsService.uploadFile(event.files[0]).subscribe((result: any) => {
        const data = {
          url: result.image.url
        };
        if (type === 0) {
          this.store.dispatch(new RetailerServiceActions.AddRetailerServiceImage(this.serviceId, data))
        } else {
          this.store.dispatch(new RetailerServiceActions.AddRetailerServiceVariantImage(id, data, { serviceId: this.serviceId }))
        }
      }, err => {
        console.log(err);
      });
    }
  }

}
