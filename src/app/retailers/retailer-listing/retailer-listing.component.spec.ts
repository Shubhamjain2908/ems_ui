import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerListingComponent } from './retailer-listing.component';

describe('SupplierListingComponent', () => {
  let component: RetailerListingComponent;
  let fixture: ComponentFixture<RetailerListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
