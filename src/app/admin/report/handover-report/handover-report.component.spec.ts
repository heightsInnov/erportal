import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandoverReportComponent } from './handover-report.component';

describe('HandoverReportComponent', () => {
  let component: HandoverReportComponent;
  let fixture: ComponentFixture<HandoverReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandoverReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandoverReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
