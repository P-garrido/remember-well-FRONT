import { TestBed } from '@angular/core/testing';

import { TributesService } from './tributes.service';

describe('TributesService', () => {
  let service: TributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
