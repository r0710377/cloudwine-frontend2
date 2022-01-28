import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganisationFormComponent } from './edit-organisation-form.component';

describe('EditOrganisationFormComponent', () => {
  let component: EditOrganisationFormComponent;
  let fixture: ComponentFixture<EditOrganisationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrganisationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrganisationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
