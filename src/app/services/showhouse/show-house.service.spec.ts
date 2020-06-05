import { TestBed } from '@angular/core/testing';

import { ShowHouseService } from './show-house.service';

describe('ShowHouseService', () => {
  let service: ShowHouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowHouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
