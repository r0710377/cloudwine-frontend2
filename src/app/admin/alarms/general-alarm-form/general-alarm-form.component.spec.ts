import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAlarmFormComponent } from './general-alarm-form.component';

describe('GeneralAlarmFormComponent', () => {
  let component: GeneralAlarmFormComponent;
  let fixture: ComponentFixture<GeneralAlarmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAlarmFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAlarmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
