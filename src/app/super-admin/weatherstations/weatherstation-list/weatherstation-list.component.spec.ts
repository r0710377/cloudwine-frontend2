import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherstationListComponent } from './weatherstation-list.component';

describe('WeatherstationListComponent', () => {
  let component: WeatherstationListComponent;
  let fixture: ComponentFixture<WeatherstationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherstationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherstationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
