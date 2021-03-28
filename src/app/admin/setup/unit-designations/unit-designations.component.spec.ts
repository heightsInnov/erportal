import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDesignationsComponent } from './unit-designations.component';

describe('UnitDesignationsComponent', () => {
  let component: UnitDesignationsComponent;
  let fixture: ComponentFixture<UnitDesignationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitDesignationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDesignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
