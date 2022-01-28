import { TestBed } from '@angular/core/testing';

import { WeatherstationUserService } from './weatherstation-user.service';

describe('WeatherstationUserService', () => {
  let service: WeatherstationUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherstationUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
