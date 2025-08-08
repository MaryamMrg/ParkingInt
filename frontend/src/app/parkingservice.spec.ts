import { TestBed } from '@angular/core/testing';

import { Parkingservice } from './parkingservice';

describe('Parkingservice', () => {
  let service: Parkingservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Parkingservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
