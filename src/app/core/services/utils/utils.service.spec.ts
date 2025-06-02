import { TestBed } from '@angular/core/testing';

import { ClassUtilsService } from './utils.service';

describe('ClassUtilsService', () => {
  let service: ClassUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
