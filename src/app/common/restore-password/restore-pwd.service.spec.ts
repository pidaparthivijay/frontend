import { TestBed } from '@angular/core/testing';

import { RestorePwdService } from './restore-pwd.service';

describe('RestorePwdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestorePwdService = TestBed.get(RestorePwdService);
    expect(service).toBeTruthy();
  });
});
