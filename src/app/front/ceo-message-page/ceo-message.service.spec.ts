import { TestBed, inject } from '@angular/core/testing';

import { CeoMessageService } from './ceo-message.service';

describe('CeoMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CeoMessageService]
    });
  });

  // it('should be created', inject([CeoMessageService], (service: CeoMessageService) => {
  //   expect(service).toBeTruthy();
  // }));
});
