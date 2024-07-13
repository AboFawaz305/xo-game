import { Component } from '@angular/core';
import { GameStateStoreService } from '../game-state-store.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  protected winner: '' | 'draw' | 'X wins' | 'O wins';
  protected isEnd: boolean;

  constructor(protected gameState: GameStateStoreService) {
    this.winner = '';
    this.isEnd = false;
  }

  changeTurn(checked: [boolean, number, number]) {
    if (!checked[0]) {
      return;
    }

    // this.gameState.MarkBoxState(checked[1], checked[2]);
    this.gameState.passTurn();
  }

  reset() {
    this.gameState.reset();
  }

}
