import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysRetailersComponent } from './todays-retailers.component';

describe('TodaysRetailersComponent', () => {
  let component: TodaysRetailersComponent;
  let fixture: ComponentFixture<TodaysRetailersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysRetailersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysRetailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
