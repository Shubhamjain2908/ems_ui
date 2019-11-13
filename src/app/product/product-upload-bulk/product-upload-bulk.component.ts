import { Component, OnInit } from '@angular/core';
import { markFormGroupTouched } from 'app/utils/form.utils';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AWSService } from 'app/services/aws.service';
import { noWhitespaceValidator } from 'app/utils/custom-validators';
import * as fromRoot from '../../reducers';
import * as fromStore from '../reducers';
import { ProductActions, UserActions } from '../actions';
import { CategoryActions, TagActions } from 'app/shared/actions';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { skip } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import * as alertFunctions from '../../shared/data/sweet-alerts';
@Component({
  selector: 'app-product-upload-bulk',
  templateUrl: './product-upload-bulk.component.html',
  styleUrls: ['./product-upload-bulk.component.scss']
})
export class ProductUploadBulkComponent implements OnInit {

  categoryId: any;
  productId: any;
  product$: Observable<any>;
  form: FormGroup;
  gst: SelectItem[];
  file: any;
  barcodeType: SelectItem[];
  categories$: Observable<any[]>;
  users$: Observable<any[]>;
  attributes$: Observable<any[]>;
  modalReference: NgbModalRef;
  variantForm: FormGroup; // variants attributes selection form to create product variants
  variantFormObject$: Observable<any>;
  productVariants: any[];
  productAttribute: FormArray;
  tags$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute,
    private awsService: AWSService,
    private modalService: NgbModal
  ) {
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.product$ = this.store.pipe(select(fromStore.getProduct));
    this.store.dispatch(new UserActions.GetUserList({ limit: 234567890, userTypeId: 2, isActive: 1, isAdminVerified: 1 }))
    this.store.dispatch(new CategoryActions.EmptyState());
    this.store.dispatch(new CategoryActions.GetCategoryList({ level: 0, eager: 'children.^', limit: 2345687890 }))
    this.tags$ = this.store.pipe(select(fromRoot.getAllTags));
    this.categories$ = this.store.pipe(select(fromRoot.getAllCategories));
    this.users$ = this.store.pipe(select(fromStore.getAllUsers));
    this.attributes$ = this.store.pipe(select(fromRoot.getVariantAttributes));
    this.variantFormObject$ = this.store.pipe(select(fromRoot.getVariantFormObject));
    this.gst = [{ label: '5', value: 5 },
    { label: '12', value: 12 },
    { label: '18', value: 18 },
    { label: '28', value: 28 }];
    this.barcodeType = [{ label: 'EAN', value: 'EAN' },
    { label: 'GCID', value: 'GCID' },
    { label: 'GTIN', value: 'GTIN' },
    { label: 'UPC', value: 'UPC' },
    { label: 'ASIN', value: 'ASIN' }];
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      file: new FormControl('', [Validators.required])
    });
  }




  onSubmit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }
    console.log(this.file);
    this.store.dispatch(new ProductActions.UploadProducts(this.file));
  }

  f = (a: any[], b: any[]): any[] => [].concat(...a.map(a2 => b.map(b2 => [].concat(a2, b2))));

  cartesian = (...c: any[]): any => {
    const [a, b, ...c1] = c;
    if (!b || b.length === 0) {
      return a;
    }
    const [b2, ...c2] = c1;
    const fab = this.f(a, b);
    return this.cartesian(fab, b2, ...c2);
  }

  onFileChange(event: any) {
    console.log(event.target.files[0]);
    // this.store.dispatch(new ProductActions.UploadProducts(event.target.files[0]));
    this.file = event.target.files[0];
    console.log(this.file);
  }

  openModal(modalName) {
    this.modalReference = this.modalService.open(modalName);
  }

  getFormAttributeValueMap(index: number) {
    return this.form.controls['product_variant']['controls'][index].controls['attributes'].value.map(v => v.value);
  }

  searchTags(event) {
    this.store.dispatch(new TagActions.GetTagList({ search: event.query }));
  }

}
