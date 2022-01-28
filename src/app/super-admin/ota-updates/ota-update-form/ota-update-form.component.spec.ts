import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtaUpdateFormComponent } from './ota-update-form.component';

describe('OtaUpdateComponent', () => {
  let component: OtaUpdateFormComponent;
  let fixture: ComponentFixture<OtaUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtaUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtaUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
