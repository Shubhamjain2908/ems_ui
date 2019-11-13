import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagUploadComponent } from './tag-upload.component';

describe('TagUploadComponent', () => {
  let component: TagUploadComponent;
  let fixture: ComponentFixture<TagUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
