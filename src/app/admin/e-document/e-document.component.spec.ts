import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EDocumentComponent } from './e-document.component';

describe('EDocumentComponent', () => {
  let component: EDocumentComponent;
  let fixture: ComponentFixture<EDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
