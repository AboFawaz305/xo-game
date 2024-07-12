import { TestBed } from '@angular/core/testing';

import { GameStateStoreService } from './game-state-store.service';

describe('GameStateStoreService', () => {
  let service: GameStateStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStateStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
