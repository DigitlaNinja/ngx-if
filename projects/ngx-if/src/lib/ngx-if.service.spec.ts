import { TestBed } from '@angular/core/testing';

import { NgxIfService } from './ngx-if.service';

describe('NgxIfService', () => {
  let service: NgxIfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxIfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
