import { TestBed } from '@angular/core/testing';

import { WeatherstationService } from './weatherstation.service';

describe('WeatherstationService', () => {
  let service: WeatherstationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherstationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
