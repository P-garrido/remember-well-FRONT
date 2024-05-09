import { TestBed } from '@angular/core/testing';

import { ProfileFilesService } from './profile-files.service';

describe('ProfileFilesService', () => {
  let service: ProfileFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
