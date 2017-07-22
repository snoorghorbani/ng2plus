import { TestBed, inject } from '@angular/core/testing';

import { FullLayoutService } from './full-layout.service';

describe('FullLayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FullLayoutService]
    });
  });

  it('should be created', inject([FullLayoutService], (service: FullLayoutService) => {
    expect(service).toBeTruthy();
  }));
});
