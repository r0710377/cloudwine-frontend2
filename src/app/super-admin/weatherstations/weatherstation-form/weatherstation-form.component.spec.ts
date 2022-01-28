import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherstationFormComponent } from './weatherstation-form.component';

describe('WeatherstationFormComponent', () => {
  let component: WeatherstationFormComponent;
  let fixture: ComponentFixture<WeatherstationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherstationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherstationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
