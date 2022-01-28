import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtaUpdateListComponent } from './ota-update-list.component';

describe('OtaUpdateListComponent', () => {
  let component: OtaUpdateListComponent;
  let fixture: ComponentFixture<OtaUpdateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtaUpdateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtaUpdateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
