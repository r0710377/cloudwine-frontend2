import { TestBed } from '@angular/core/testing';

import { OtaUpdateService } from './ota-update.service';

describe('OtaUpdateService', () => {
  let service: OtaUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtaUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
