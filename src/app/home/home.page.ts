import { Component } from '@angular/core';
import { GameStateStoreService } from '../game-state-store.service';
import { GameLoopService } from '../game-loop.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  protected winner: string;
  protected isEnd: boolean;
  protected updateInfo = false;

  constructor(protected gameState: GameStateStoreService, protected gameLoop: GameLoopService) {
    this.winner = gameState.getWinner();
    this.isEnd = gameState.getEnd();
  }

  changeTurn(checked: [boolean, number, number]) {
    if (!checked[0]) {
      return;
    }

    if (this.gameLoop.isEnd()) {
      this.gameState.setEnd();
      const w = this.gameLoop.getWinner();
      this.gameState.setWinner(w);
      this.winner = this.gameState.getWinner();
      this.isEnd = this.gameState.getEnd();
      if (this.winner !== 'draw') {
        const wpid = w === 'x' ? 1 : 2;
        this.gameState.incrementPlayerScore(wpid);
        this.updateInfo = !this.updateInfo;
      }
      return;
    }

    this.gameState.passTurn();
    this.updateInfo = !this.updateInfo;
  }

  reset() {
    this.gameState.reset();
    this.winner = '';
    this.isEnd = false;
    location.reload();
  }

}
