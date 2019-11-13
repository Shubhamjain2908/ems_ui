import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRetailerComponent } from './edit-retailer.component';

describe('AddRetailerComponent', () => {
  let component: EditRetailerComponent;
  let fixture: ComponentFixture<EditRetailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRetailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
