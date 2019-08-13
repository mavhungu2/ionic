import { TestBed } from '@angular/core/testing';

import { CloudApiService } from './cloud-api.service';

describe('CloudApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CloudApiService = TestBed.get(CloudApiService);
    expect(service).toBeTruthy();
  });
});
