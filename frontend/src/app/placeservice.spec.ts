import { TestBed } from '@angular/core/testing';

import { Placeservice } from './placeservice';

describe('Placeservice', () => {
  let service: Placeservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Placeservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
