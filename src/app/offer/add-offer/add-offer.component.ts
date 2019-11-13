import { Component, OnInit } from '@angular/core';
import { ProductActions } from 'app/product/actions';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AWSService } from 'app/services/aws.service';
import { OfferActions } from '../actions';
import { noWhitespaceValidator, percentageValidator, datesValidator } from 'app/utils/custom-validators';
import { markFormGroupTouched } from 'app/utils/form.utils';
import * as fromStore from './../reducers';
import { CollectionActions } from 'app/collection/actions';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {

  offerId: any;
  form: FormGroup;
  filterForm: FormGroup;
  offer$: Observable<any>;
  products$: Observable<any>;
  collections$: Observable<any>;
  showDropdown = false;
  query: any = '';
  today = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute,
    private awsService: AWSService) {
    this.store.dispatch(new OfferActions.EmptyState());
    if (this.route.snapshot.paramMap.get('id')) {
      this.offerId = this.route.snapshot.paramMap.get('id')
      this.store.dispatch(new OfferActions.GetOffer(this.offerId, { eager: '[products, collections]' }))
    }
    this.offer$ = this.store.select(fromStore.getOffer);
    this.products$ = this.store.pipe(select(fromStore.getAllProducts));
    this.collections$ = this.store.pipe(select(fromStore.getAllCollections));
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, noWhitespaceValidator]),
      products: new FormControl('', []),
      collections: new FormControl('', []),
      type: new FormControl('fixed', [Validators.required]),
      value: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(0.01)]),
      start_date: new FormControl(new Date(), []),
      end_date: new FormControl('', [])
    });
    this.form.setValidators([percentageValidator(), datesValidator('start_date', 'end_date')]);
    this.offer$.subscribe({
      next: offer => {
        if (offer) {
          this.form.patchValue({
            ...offer,
            start_date: offer.start_date ? new Date(offer.start_date) : null,
            end_date: offer.end_date ? new Date(offer.end_date) : null,
          });
        }
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      console.log('invalid')
      return;
    }
    const data = this.form.value;
    if (this.offerId) {
      this.store.dispatch(new OfferActions.UpdateOffer(this.offerId, data))
    } else {
      this.store.dispatch(new OfferActions.CreateOffer(data))
    }
  }

  // selectFile(event: any) {
  //   this.awsService.uploadFile(event.target.files[0]).subscribe((result: any) => {
  //     this.form.patchValue({ imageUrl: result.image.url });
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  search(event: any) {
    this.query = event.query;
    this.store.dispatch(new ProductActions.GetProductList({ search: this.query, limit: 234567890 }))
  }

  searchCollection(event: any) {
    this.query = event.query;
    this.store.dispatch(new CollectionActions.GetCollectionList({ search: this.query, limit: 234567890 }))
  }

}
