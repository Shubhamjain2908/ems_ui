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
import { RetailerServiceActions, UserActions } from '../actions';
import { CategoryActions } from 'app/shared/actions';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { skip } from 'rxjs/operators';
import swal from 'sweetalert2';
@Component({
  selector: 'app-retailer-service-add',
  templateUrl: './retailer-service-add.component.html',
  styleUrls: ['./retailer-service-add.component.scss']
})
export class RetailerServiceAddComponent implements OnInit {

  categoryId: any;
  urls: any;
  serviceId: any;
  service$: Observable<any>;
  form: FormGroup;
  categories$: Observable<any[]>;
  users$: Observable<any[]>;
  attributes$: Observable<any[]>;
  modalReference: NgbModalRef;
  variantForm: FormGroup; // variants attributes selection form to create service variants
  variantFormObject$: Observable<any>;
  serviceVariants: any[];
  serviceAttribute: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute,
    private awsService: AWSService,
    private modalService: NgbModal
  ) {
    this.serviceId = this.route.snapshot.paramMap.get('serviceId');
    this.service$ = this.store.pipe(select(fromStore.getRetailerService));
    this.store.dispatch(new UserActions.GetUserList({ limit: 234567890, userTypeId: 3, isActive: 1, isAdminVerified: 1 }))
    this.store.dispatch(new CategoryActions.EmptyState());
    this.store.dispatch(new CategoryActions.GetCategoryList({ level: 0, eager: 'children.^', limit: 2345687890 }))
    this.categories$ = this.store.pipe(select(fromRoot.getAllCategories));
    this.users$ = this.store.pipe(select(fromStore.getAllUsers));
    this.attributes$ = this.store.pipe(select(fromRoot.getVariantAttributes));
    this.variantFormObject$ = this.store.pipe(select(fromRoot.getVariantFormObject));
  }

  ngOnInit() {
    this.urls = new Array<any>();
    this.form = this.formBuilder.group({
      service_name: new FormControl('', [Validators.required, noWhitespaceValidator]),
      service_description: new FormControl('', [Validators.required, noWhitespaceValidator]),
      service_price: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.min(1)]),
      category_id: new FormControl('', [Validators.required]),
      images: new FormControl([], [Validators.required]),
      retailer_id: new FormControl('', [Validators.required]),
    });

    this.form.controls['category_id'].valueChanges.subscribe({
      next: value => {
        if (value.id) {
          this.store.dispatch(new CategoryActions.GetVariantAttributes(value.id));
        }
      }
    });

    this.variantFormObject$.subscribe({
      next: value => {
        this.variantForm = this.formBuilder.group(value);
      }
    });

    this.form.controls['retailer_id'].valueChanges.subscribe({
      next: value => {
        if (!value) {
          this.form.controls['category'].reset();
        }
        if (value && value.id) {
          console.log(value);
          this.form.controls['category_id'].reset();
          this.store.dispatch(new CategoryActions.GetCategoryList({ level: 0, eager: 'children.^', limit: 2345687890, userId: value.id }));
        }
      }
    });
    this.service$.subscribe({
      next: value => {
        if (!this.serviceId) {
          return;
        }
        if (!value) {
          if (this.serviceId) {
            this.store.dispatch(new RetailerServiceActions.GetRetailerService(this.serviceId));
          } else {
            this.store.dispatch(new RetailerServiceActions.EmptyState())
          }
          return;
        }
        value.category_id = value.category;
        value.retailer_id = value.retailer;
        this.urls = value.images;
        // this.serviceVariants = value.service_variant;
        // if (!value.service_attributes) {
        //   delete value.service_attributes;
        // } else {
        //   value.service_attributes.forEach(attr => {
        //     this.addRetailerServiceAttributeForm();
        //   })
        // }
        // this.serviceVariants.forEach(e => {
        //   const variants = this.form.get('service_variant') as FormArray;
        //   variants.push(this.createRetailerServiceVariantForm());
        // })
        console.log(value);
        this.form.patchValue(value);
        console.log(this.form.value);
      }
    })

    // this.attributes$.pipe(skip(1)).subscribe({
    //   next: value => {
    //     if (value.length === 0) {
    //       const variants = this.form.get('service_variant') as FormArray;
    //       while (variants.length !== 0) {
    //         variants.removeAt(0);
    //       }
    //       return;
    //     }
    //     if (this.form.get('category').value.id === this.categoryId) {
    //       // let variants = this.form.get('service_variant') as FormArray;
    //       // variants = this.formBuilder.array([]);
    //       this.serviceVariants.forEach(e => {
    //         const variants = this.form.get('service_variant') as FormArray;
    //         variants.push(this.createRetailerServiceVariantForm());
    //       })
    //       this.form.patchValue({ service_variant: this.serviceVariants })
    //     }
    //   }
    // })
  }

  createRetailerServiceVariantForm() {
    return this.formBuilder.group({
      quantity: new FormControl(0, []),
      price_override: new FormControl(null, [Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]),
      cost_price: new FormControl(null, [Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]),
      attributes: new FormControl({}, [])
    });
  }

  createRetailerServiceAttributeForm() {
    return this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required])
    });
  }

  addRetailerServiceAttributeForm() {
    this.serviceAttribute = this.form.get('service_attributes') as FormArray;
    this.serviceAttribute.push(this.createRetailerServiceAttributeForm());
  }

  removeRetailerServiceAttributeForm(index: number) {
    this.serviceAttribute = this.form.get('service_attributes') as FormArray;
    this.serviceAttribute.removeAt(index);
  }

  removeRetailerServiceVariant(index: number) {
    this.serviceAttribute = this.form.get('service_variant') as FormArray;
    this.serviceAttribute.removeAt(index);
  }

  onSubmit() {
    console.log('came here?');
    if (this.form.invalid) {
      console.log('form invalid');
      markFormGroupTouched(this.form);
      return;
    }
    console.log(this.form);
    this.form.value.retailer_id = this.form.value.retailer_id.id;
    this.form.value.category_id = this.form.value.category_id.id;
    console.log(this.form);
    if (this.serviceId) {
      this.store.dispatch(new RetailerServiceActions.UpdateRetailerService(this.serviceId, this.form.value))
      return;
    }
    this.store.dispatch(new RetailerServiceActions.CreateRetailerService(this.form.value));
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
    const variants = this.form.get('service_variant') as FormArray;
    let attributes = [];
    let form: FormGroup;
    for (let i = 0; i < cartesian_choices.length; i++) {
      attributes = [];
      for (let j = 0; j < attributeIds.length; j++) {
        attributes.push({ name: attributeIds[j], value: cartesian_choices[i][j] });
      }
      form = this.createRetailerServiceVariantForm();
      form.patchValue({ quantity: 0, attributes })
      variants.push(form)
    }
    console.log('Variants', variants);
  }

  onVariantFormSubmit() {
    console.log('Form Value', this.variantForm.value);
    this.createVariants(this.variantForm.value);
  }

  selectFile(event: any) {
    console.log(event.files[0]);
    console.log(this.urls);
    this.awsService.uploadFile(event.files[0]).subscribe((result: any) => {
      this.urls.push({ url: result.image.url });
      this.form.patchValue({ images: this.urls });
      console.log(this.urls);
    }, err => {
      console.log(err);
    });
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
        self.deleteImageFile(data);
      }
    })
  }

  deleteImageFile(value: any) {
    console.log(value);
    console.log(this.urls);
    const index = this.urls.indexOf(value);
    this.urls.splice(index, 1);
    console.log(this.urls);
    this.form.patchValue({ images: this.urls });
    console.log(this.urls);
  }

  openModal(modalName) {
    this.modalReference = this.modalService.open(modalName);
  }

  getFormAttributeValueMap(index: number) {
    return this.form.controls['service_variant']['controls'][index].controls['attributes'].value.map(v => v.value);
  }

}
