import { TestBed } from '@angular/core/testing';

import { DataCollectorService } from './data-collector.service';

describe('DataCollectorService', () => {
  let service: DataCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
