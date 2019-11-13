import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysCustomersComponent } from './todays-customers.component';

describe('TodaysCustomersComponent', () => {
  let component: TodaysCustomersComponent;
  let fixture: ComponentFixture<TodaysCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodaysCustomersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
