import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributeChoiceComponent } from './add-attribute-choice.component';

describe('AddAttributeChoiceComponent', () => {
  let component: AddAttributeChoiceComponent;
  let fixture: ComponentFixture<AddAttributeChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttributeChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributeChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
