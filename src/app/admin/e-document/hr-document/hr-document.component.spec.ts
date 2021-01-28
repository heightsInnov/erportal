import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDocumentComponent } from './hr-document.component';

describe('HrDocumentComponent', () => {
  let component: HrDocumentComponent;
  let fixture: ComponentFixture<HrDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
