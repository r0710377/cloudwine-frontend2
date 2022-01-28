import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherstationFilterComponent } from './weatherstation-filter.component';

describe('WeatherstationFilterComponent', () => {
  let component: WeatherstationFilterComponent;
  let fixture: ComponentFixture<WeatherstationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherstationFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherstationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
