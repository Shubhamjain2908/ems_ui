import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { skip, tap, debounceTime } from 'rxjs/operators';
import { LoaderActions } from 'app/shared/actions';
import * as fromRoot from './../../reducers';
import * as fromStore from './../reducers'
import { OfferActions } from '../actions';
import swal from 'sweetalert2';
import * as alertFunctions from '../../shared/data/sweet-alerts';
@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  offers$: Observable<any>;
  loading$: Observable<boolean>;
  nextPage$: Observable<boolean>;
  limit = 30;
  offset = 0;
  page = 1;
  form: FormGroup;

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.loading$ = this.store.select(fromRoot.getLoadingStatus)
    this.offers$ = this.store.select(fromStore.getAllOffers);
    this.nextPage$ = this.store.select(fromRoot.pageDisabled);
    this.store.dispatch(new OfferActions.GetOfferList({
      limit: this.limit,
      offset: this.offset,
    }))
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      skip(1),
      tap(x => this.store.dispatch(new LoaderActions.SetLoadingTrue())),
      debounceTime(200)
    ).subscribe({
      next: x => {
        this.store.dispatch(new OfferActions.GetOfferList(x))
      }
    });
    this.form = this.formBuilder.group({
      search: new FormControl('', [])
    })
    this.form.valueChanges.subscribe({
      next: x => {
        this.limit = 30;
        this.offset = 0;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            limit: this.limit,
            offset: this.offset,
            ...x
          },
          queryParamsHandling: 'merge',
          skipLocationChange: true
        });
      }
    })
  }

  change_page(page) {
    this.page = page > 0 ? page : 1;
    this.offset = 0 + this.limit * (this.page - 1);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        limit: this.limit,
        offset: this.offset
      },
      queryParamsHandling: 'merge',
      skipLocationChange: true
    });
  }

  confirmTextOffer(data) {
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
        self.deleteOffer(data.id);
      }
    })
  }

  deleteOffer(id: any) {
    this.store.dispatch(new OfferActions.DeleteOffer(id, { limit: this.limit, offset: this.offset }));
    alertFunctions.typeCustom('Success!', 'Offer deleted!', 'success');
  }

}
