import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysSuppliersComponent } from './todays-suppliers.component';

describe('TodaysSuppliersComponent', () => {
  let component: TodaysSuppliersComponent;
  let fixture: ComponentFixture<TodaysSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
