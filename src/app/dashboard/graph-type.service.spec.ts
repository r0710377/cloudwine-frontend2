import { TestBed } from '@angular/core/testing';

import { GraphTypeService } from './graph-type.service';

describe('GraphTypeService', () => {
  let service: GraphTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
