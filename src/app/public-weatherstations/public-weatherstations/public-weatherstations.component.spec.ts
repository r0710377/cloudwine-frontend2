import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWeatherstationsComponent } from './public-weatherstations.component';

describe('PublicWeatherstationsComponent', () => {
  let component: PublicWeatherstationsComponent;
  let fixture: ComponentFixture<PublicWeatherstationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicWeatherstationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicWeatherstationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
