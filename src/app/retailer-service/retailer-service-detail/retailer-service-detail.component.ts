import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { RetailerServiceActions } from '../actions';
import * as fromStore from '../reducers';

@Component({
  selector: 'app-retailer-service-detail',
  templateUrl: './retailer-service-detail.component.html',
  styleUrls: ['./retailer-service-detail.component.scss']
})
export class RetailerServiceDetailComponent implements OnInit {

  service$: Observable<any>;
  serviceId: any;
  service: any;
  noImages = true;
  isPublished = false;
  imagesError = false;

  constructor(private store: Store<any>, private route: ActivatedRoute) {
    this.serviceId = this.route.snapshot.paramMap.get('serviceId');
    this.store.dispatch(new RetailerServiceActions.GetRetailerService(this.serviceId));
    this.service$ = this.store.pipe(select(fromStore.getRetailerService));
  }

  ngOnInit() {
    this.service$.subscribe({
      next: value => {
        if (!value) {
          return;
        }
        this.service = value;
        this.isPublished = value.is_published;
        if (value.images.length) {
          this.noImages = false
        }
      }
    })
  }

  getVariantValueMap(atrributes: any[]) {
    return atrributes.map(r => r.value)
  }

  togglePublishStatus(event) {
    if (this.noImages) {
      this.isPublished = false;
      return;
    }
    this.store.dispatch(new RetailerServiceActions.PatchRetailerService(this.serviceId, { is_published: this.isPublished }));
  }
  setImagesError() {
    if (this.noImages) {
      this.imagesError = true
    }
  }
}
