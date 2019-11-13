import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerServiceListComponent } from './retailer-service-list.component';

describe('RetailerServiceListComponent', () => {
  let component: RetailerServiceListComponent;
  let fixture: ComponentFixture<RetailerServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetailerServiceListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
