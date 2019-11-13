import { Component, OnInit } from '@angular/core';
import { markFormGroupTouched } from 'app/utils/form.utils';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AWSService } from 'app/services/aws.service';
import { noWhitespaceValidator } from 'app/utils/custom-validators';
import * as fromRoot from './../../reducers';
import * as fromStore from './../reducers';
import { ProductActions, UserActions } from '../actions';
import { CategoryActions, TagActions } from 'app/shared/actions';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { skip } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.scss']
})
export class ProductUploadComponent implements OnInit {

  categoryId: any;
  productId: any;
  product$: Observable<any>;
  form: FormGroup;
  userType: any;
  saveButtonEnable = true;
  gst: SelectItem[];
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
      name: new FormControl('', [Validators.required, noWhitespaceValidator]),
      userType: new FormControl(2, [Validators.required]),
      description: new FormControl('', [Validators.required, noWhitespaceValidator]),
      weight: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1),
      Validators.max(9999999999)]),
      // volume: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1),
      // Validators.max(9999999999)]),
      length: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1),
      Validators.max(9999999999)]),
      breadth: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1),
      Validators.max(9999999999)]),
      height: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1),
      Validators.max(9999999999)]),
      inventory_count: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(0)]),
      gst: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1)]),
      hsn: new FormControl(''),
      barcode: new FormControl(''),
      barcode_type: new FormControl(''),
      vendorSKU: new FormControl(''),
      active: new FormControl(0, [Validators.pattern('^[0-9]*$'), Validators.min(0)]),
      cost_price: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1)]),
      price: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1)]),
      category: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      product_variant: this.formBuilder.array([]),
      product_attributes: this.formBuilder.array([]),
      tags: new FormControl([], [])
    });

    this.form.controls['category'].valueChanges.subscribe({
      next: value => {
        if (!value) {
          return
        }
        if (value.id) {
          this.store.dispatch(new CategoryActions.GetVariantAttributes(value.id));
        }
      }
    });

    this.form.controls['user'].valueChanges.subscribe({
      next: value => {
        if (!value) {
          this.form.controls['category'].reset();
        }
        if (value && value.id) {
          console.log(value);
          this.form.controls['category'].reset();
          this.store.dispatch(new CategoryActions.GetCategoryList({ level: 0, eager: 'children.^', limit: 2345687890, userId: value.id }));
        }
      }
    });

    this.form.controls['userType'].valueChanges.subscribe({
      next: value => {
        if (value === 2) {
          this.form.controls['user'].reset();
          this.store.dispatch(new UserActions.GetUserList({ limit: 234567890, userTypeId: 2, isActive: 1, isAdminVerified: 1 }));
        } else if (value === 3) {
          this.form.controls['user'].reset();
          this.store.dispatch(new UserActions.GetUserList({ limit: 234567890, userTypeId: 3, isActive: 1, isAdminVerified: 1 }))
        }
      }
    });

    this.variantFormObject$.subscribe({
      next: value => {
        this.variantForm = this.formBuilder.group(value);
      }
    });

    this.product$.subscribe({
      next: value => {
        if (!this.productId) {
          return;
        }
        if (!value) {
          if (this.productId) {
            this.store.dispatch(new ProductActions.GetProduct(this.productId));
          } else {
            this.store.dispatch(new ProductActions.EmptyState())
          }
          return;
        }
        this.categoryId = value.categoryId;
        this.productVariants = value.product_variant;
        if (!value.product_attributes) {
          delete value.product_attributes;
        } else {
          value.product_attributes.forEach(attr => {
            this.addProductAttributeForm();
          })
        }
        // this.productVariants.forEach(e => {
        //   const variants = this.form.get('product_variant') as FormArray;
        //   variants.push(this.createProductVariantForm());
        // })
        this.form.patchValue(value);
      }
    })

    this.attributes$.pipe(skip(1)).subscribe({
      next: value => {
        console.log(value);
        if (value.length === 1) {
          if (value[0].attribute_choice.length < 1) {
            this.saveButtonEnable = false;
          }
        }
        if (value.length === 0) {
          const variants = this.form.get('product_variant') as FormArray;
          while (variants.length !== 0) {
            variants.removeAt(0);
          }
          return;
        }
        if (this.form.get('category').value.id === this.categoryId) {
          // let variants = this.form.get('product_variant') as FormArray;
          // variants = this.formBuilder.array([]);
          this.productVariants.forEach(e => {
            const variants = this.form.get('product_variant') as FormArray;
            variants.push(this.createProductVariantForm());
          })
          this.form.patchValue({ product_variant: this.productVariants })
        }
      }
    })
  }

  createProductVariantForm() {
    return this.formBuilder.group({
      quantity: new FormControl(0, []),
      price_override: new FormControl(null, [Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]),
      cost_price: new FormControl(null, [Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]),
      attributes: new FormControl({}, [])
    });
  }

  createProductAttributeForm() {
    return this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required])
    });
  }

  addProductAttributeForm() {
    this.productAttribute = this.form.get('product_attributes') as FormArray;
    this.productAttribute.push(this.createProductAttributeForm());
  }

  removeProductAttributeForm(index: number) {
    this.productAttribute = this.form.get('product_attributes') as FormArray;
    this.productAttribute.removeAt(index);
  }

  removeProductVariant(index: number) {
    this.productAttribute = this.form.get('product_variant') as FormArray;
    this.productAttribute.removeAt(index);
  }

  onSubmit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }
    let data = this.form.value;
    if (data.active === '') {
      data.active = 0;
    }
    delete data.userType;
    if (this.productId) {
      this.store.dispatch(new ProductActions.UpdateProduct(this.productId, data))
      return;
    }
    this.store.dispatch(new ProductActions.CreateProduct(this.form.value));
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

  createVariants(value: object) {
    let attributeIds = Object.keys(value);
    // const values = Object.values(value);
    const choices: any = [];
    attributeIds = attributeIds.filter((c: any, i) => {
      if (value[c].length !== 0) {
        choices.push(value[c]);
        return c;
      }
    });
    if (attributeIds.length === 0) {
      alert('Please select atleast one variant!');
      return;
    }
    let cartesian_choices = this.cartesian(...choices);
    if (attributeIds.length === 1) {
      cartesian_choices = cartesian_choices.map((c: any) => [c]);
    }
    const variants = this.form.get('product_variant') as FormArray;
    let attributes = [];
    let form: FormGroup;
    for (let i = 0; i < cartesian_choices.length; i++) {
      attributes = [];
      for (let j = 0; j < attributeIds.length; j++) {
        attributes.push({ name: attributeIds[j], value: cartesian_choices[i][j] });
      }
      form = this.createProductVariantForm();
      form.patchValue({ quantity: 0, attributes })
      variants.push(form)
    }
    console.log('Variants', variants);
  }

  onVariantFormSubmit() {
    console.log('Form Value', this.variantForm.value);
    this.createVariants(this.variantForm.value);
    this.modalReference.close();
  }

  selectFile(event: any) {
    this.awsService.uploadFile(event.target.files[0]).subscribe((result: any) => {
      this.form.patchValue({ image: result.image.url });
    }, err => {
      console.log(err);
    });
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
