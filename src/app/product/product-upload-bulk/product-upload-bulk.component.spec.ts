import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUploadBulkComponent } from './product-upload-bulk.component';

describe('ProductUploadBulkComponent', () => {
  let component: ProductUploadBulkComponent;
  let fixture: ComponentFixture<ProductUploadBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductUploadBulkComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUploadBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
