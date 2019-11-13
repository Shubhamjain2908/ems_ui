import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'app/services/notification.service';
import { Router } from '@angular/router';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { TagActions } from 'app/shared/actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from './../../reducers';
import { AdminService } from 'app/services/admin.service';
import { AWSService } from 'app/services/aws.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [AdminService]
})
export class NotificationComponent implements OnInit {
  public data: any = [];
  public userTypes: any = [];
  table_loader_class = 'table_loader';
  table_loader_class2 = '';
  tags$: Observable<any>;
  modalReference: NgbModalRef;
  closeResult: string;

  category: any;
  noRecordErr = false;

  page = 1;
  currentPage = 0;
  payload: Object = {
    page: 1,
    limit: 10
  };

  addNotificationForm = new FormGroup({
    notificationMessage: new FormControl('', [Validators.required]),
    userTypes: new FormControl([], [Validators.required]),
    notificationLink: new FormControl('', [Validators.required]),
    imageUrl: new FormControl(''),
    tags: new FormControl([], []),
  });

  constructor(private modalService: NgbModal,
    private _httpService: NotificationService,
    private _router: Router,
    private awsService: AWSService,
    private store: Store<any>
  ) {
    this.tags$ = this.store.pipe(select(fromRoot.getAllTags));
  }

  ngOnInit() {
    this.userTypes = [{
      "option": 'Supplier',
      "value": 2
    }, {
      "option": 'Retailer',
      "value": 3
    }, {
      "option": 'Customer',
      "value": 4
    }, {
      "option": 'Agent',
      "value": 5
    }, {
      "option": 'Retailer Agent',
      "value": 6
    }];
  }

  searchTags(event) {
    this.store.dispatch(new TagActions.GetTagList({ search: event.query }));
  }

  selectFile(event: any) {
    this.awsService.uploadFile(event.target.files[0]).subscribe((result: any) => {
      this.addNotificationForm.patchValue({ imageUrl: result.image.url });
    }, err => {
      console.log(err);
    });
  }

  onAddNotification() {
    let data = this.addNotificationForm.value;
    console.log('data after policy removed', data);
    data.userTypes = data.userTypes.map((d) => {
      return d.value;
    });
    data.tags = data.tags.map((d) => {
      return d.id;
    });
    this._httpService.sendNotification(data)
      .subscribe((result: any) => {
        if (result.success === true) {
          alertFunctions.typeCustom('Success!', 'Notifications Sent Successfully!', 'success');
          this.addNotificationForm.reset();
          this.addNotificationForm.patchValue({ imageUrl: null });
        }
      }, (err: any) => {
        this.errorHandle(err);
      }, () => console.log());
  }

  errorHandle(err) {
    // this.displayMessageError = true;
    if (err.status === 406) {
      alertFunctions.typeCustom('Error!', err.error.message, 'error');
    }
    if (err.status === 400) {
      alertFunctions.typeCustom('Error!', err.error.message, 'error');
    }
    if (err.status === 0) {
      // this.message = 'Please check your internet connection';
      alertFunctions.typeCustom('Error!', 'Please check your internet connection', 'warning');
      return;
    } else if (err.status === 500) {
      alertFunctions.typeCustom('Server Error!', 'Internal Server Error', 'error');
    } else if (err.status === 422) {
      alertFunctions.typeCustom('Validation Error!', err.error.message, 'error');
    } else if (err.status === 405) {
      alertFunctions.typeCustom('Not Allowed!', err.error.message, 'error');
    } else if (err.status === 401) {
      this._router.navigate(['/logout']);
    }
    // this.message = JSON.parse(err._body).message;
  }
}
