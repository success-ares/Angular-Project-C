import { TestBed, inject } from '@angular/core/testing';

import { SkywalkProjectService } from './skywalk-project.service';

describe('SkywalkProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkywalkProjectService]
    });
  });

  // it('should be created', inject([SkywalkProjectService], (service: SkywalkProjectService) => {
  //   expect(service).toBeTruthy();
  // }));
});
