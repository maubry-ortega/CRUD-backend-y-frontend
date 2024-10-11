import { TestBed } from '@angular/core/testing';

import { PersonalizaIntlService } from './personaliza-intl.service';

describe('PersonalizaIntlService', () => {
  let service: PersonalizaIntlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalizaIntlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
