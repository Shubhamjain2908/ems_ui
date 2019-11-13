import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ProductActions } from '../actions';
import * as fromStore from './../reducers';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<any>;
  productId: any;
  product: any;
  noImages = true;
  isPublished = false;
  imagesError = false;

  constructor(private store: Store<any>, private route: ActivatedRoute) {
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.store.dispatch(new ProductActions.GetProduct(this.productId));
    this.product$ = this.store.pipe(select(fromStore.getProduct));
  }

  ngOnInit() {
    this.product$.subscribe({
      next: value => {
        if (!value) {
          return;
        }
        this.product = value;
        this.isPublished = value.is_published;
        if (value.images.length) {
          this.noImages = false
        }
        if (!value.images.length && value.product_variant.length) {
          this.noImages = value.product_variant.findIndex(pv => pv.images.length > 0) === -1
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
    this.store.dispatch(new ProductActions.PatchProduct(this.productId, { is_published: this.isPublished }));
  }

  setImagesError() {
    if (this.noImages) {
      this.imagesError = true
    }
  }

}
