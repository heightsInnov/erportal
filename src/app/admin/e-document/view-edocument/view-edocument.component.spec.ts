import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEdocumentComponent } from './view-edocument.component';

describe('ViewEdocumentComponent', () => {
  let component: ViewEdocumentComponent;
  let fixture: ComponentFixture<ViewEdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEdocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
