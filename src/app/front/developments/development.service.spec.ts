import { TestBed, inject } from '@angular/core/testing';

import { DevelopmentService } from './development.service';

describe('DevelopmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevelopmentService]
    });
  });

  // it('should be created', inject([DevelopmentService], (service: DevelopmentService) => {
  //   expect(service).toBeTruthy();
  // }));
});
