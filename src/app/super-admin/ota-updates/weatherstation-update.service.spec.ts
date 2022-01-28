import { TestBed } from '@angular/core/testing';

import { WeatherstationUpdateService } from './weatherstation-update.service';

describe('WeatherstationUpdateService', () => {
  let service: WeatherstationUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherstationUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
