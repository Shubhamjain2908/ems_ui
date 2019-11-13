import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerServiceDetailComponent } from './retailer-service-detail.component';

describe('RetailerServiceDetailComponent', () => {
  let component: RetailerServiceDetailComponent;
  let fixture: ComponentFixture<RetailerServiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetailerServiceDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
