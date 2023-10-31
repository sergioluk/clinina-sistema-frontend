import { TestBed } from '@angular/core/testing';

import { CardHomeService } from './card-home.service';

describe('CardHomeService', () => {
  let service: CardHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
