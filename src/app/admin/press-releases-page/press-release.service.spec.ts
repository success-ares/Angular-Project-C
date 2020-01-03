import { TestBed, inject } from '@angular/core/testing';

import { PressReleaseService } from './press-release.service';

describe('PressReleaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PressReleaseService]
    });
  });

  // it('should be created', inject([PressReleaseService], (service: PressReleaseService) => {
  //   expect(service).toBeTruthy();
  // }));
});
