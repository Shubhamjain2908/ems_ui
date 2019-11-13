import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerServiceAddComponent } from './retailer-service-add.component';

describe('RetailerServiceUploadComponent', () => {
  let component: RetailerServiceAddComponent;
  let fixture: ComponentFixture<RetailerServiceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetailerServiceAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerServiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
