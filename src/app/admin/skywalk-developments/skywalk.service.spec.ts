import { TestBed, inject } from '@angular/core/testing';

import { SkywalkService } from './skywalk.service';

describe('SkywalkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkywalkService]
    });
  });

  // it('should be created', inject([SkywalkService], (service: SkywalkService) => {
  //   expect(service).toBeTruthy();
  // }));
});
