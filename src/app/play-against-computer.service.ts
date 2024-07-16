import { Injectable } from '@angular/core';
import { GameStateStoreService, XOSlot } from './game-state-store.service';

@Injectable({
  providedIn: 'root'
})
export class PlayAgainstComputerService {
  private role: XOSlot = '';

  constructor(private gameState: GameStateStoreService) { }

  start(role: XOSlot) {
    this.role = role;
  }

  play() {
    // get empty slots and store it in moves array
    const moves: number[][] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.gameState.getBoxState(i, j) === '') {
          moves.push([i, j]);
        }
      }
    }
    const choice = Math.floor(Math.random() * moves.length);
    //@ts-ignore
    this.gameState.MarkBoxState(choice[0], choice[1]);
  }

}
