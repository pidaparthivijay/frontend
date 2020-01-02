import { TestBed } from '@angular/core/testing';

import { EmpManageService } from './emp-manage.service';

describe('EmpManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpManageService = TestBed.get(EmpManageService);
    expect(service).toBeTruthy();
  });
});
