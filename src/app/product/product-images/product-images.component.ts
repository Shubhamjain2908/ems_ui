import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from './../reducers';
import { ProductActions } from '../actions';
import { AWSService } from 'app/services/aws.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit {

  product$: Observable<any>;
  productId: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private awsService: AWSService) {
    this.product$ = this.store.pipe(select(fromStore.getProduct));
  }

  ngOnInit() {
    this.product$.subscribe({
      next: value => {
        if (!value) {
          this.store.dispatch(new ProductActions.GetProduct(this.route.snapshot.paramMap.get('productId')))
        } else {
          this.productId = value.id
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
          this.store.dispatch(new ProductActions.AddProductImage(this.productId, data))
        } else {
          this.store.dispatch(new ProductActions.AddProductVariantImage(id, data, { productId: this.productId }))
        }
      }, err => {
        console.log(err);
      });
    }
  }

  confirmTextImage(data) {
    const self = this;
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success btn-raised mr-5',
      cancelButtonClass: 'btn btn-danger btn-raised',
      buttonsStyling: false
    }).then(function (isConfirm) {
      if (typeof isConfirm.value !== 'undefined' && isConfirm.hasOwnProperty('value')) {
        self.deleteImage(data.id);
      }
    })
  }

  deleteImage(id: any) {
    this.store.dispatch(new ProductActions.DeleteProductImage(this.productId, id));
  }

}
