import { TestBed } from '@angular/core/testing';

import { PlayAgainstComputerService } from './play-against-computer.service';

describe('PlayAgainstComputerService', () => {
  let service: PlayAgainstComputerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayAgainstComputerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
