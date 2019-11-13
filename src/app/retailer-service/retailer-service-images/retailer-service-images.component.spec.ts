import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerServiceImagesComponent } from './retailer-service-images.component';

describe('RetailerServiceImagesComponent', () => {
  let component: RetailerServiceImagesComponent;
  let fixture: ComponentFixture<RetailerServiceImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetailerServiceImagesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerServiceImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
