import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTypesComponent } from './upload-types.component';

describe('UploadTypesComponent', () => {
  let component: UploadTypesComponent;
  let fixture: ComponentFixture<UploadTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
