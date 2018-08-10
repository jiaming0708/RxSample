import { TestBed, inject } from '@angular/core/testing';

import { EnvAPIService } from './env-api.service';

describe('EnvAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvAPIService]
    });
  });

  it('should be created', inject([EnvAPIService], (service: EnvAPIService) => {
    expect(service).toBeTruthy();
  }));
});
