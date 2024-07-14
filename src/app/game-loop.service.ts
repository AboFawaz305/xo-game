import { Injectable } from '@angular/core';
import { GameStateStoreService, XOSlot } from './game-state-store.service';

@Injectable({
  providedIn: 'root'
})
export class GameLoopService {
  private winner: XOSlot = '';
  constructor(private gameState: GameStateStoreService) { }
  isDraw(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.gameState.getBoxState(i, j) === '') {
          return false;
        }
      }
    }
    return true;
  }

  isWinByRow(): boolean {
    for (let i = 0; i < 3; i++) {
      const c = this.gameState.getBoxState(i, 0);
      let isWin = true;
      for (let j = 1; j < 3; j++) {
        if (c === '' || c !== this.gameState.getBoxState(i, j)) {
          isWin = false;
          break;
        }
      }
      if (isWin) {
        this.winner = c;
        return true;
      }
    }
    return false;
  }

  isWinByCol(): boolean {
    for (let i = 0; i < 3; i++) {
      const c = this.gameState.getBoxState(0, i);
      let isWin = true;
      for (let j = 1; j < 3; j++) {
        if (c === '' || c !== this.gameState.getBoxState(j, i)) {
          isWin = false;
          break;
        }
      }
      if (isWin) {
        this.winner = c;
        return true;
      }
    }
    return false;
  }

  isWinByDiagnal(): boolean {
    let c1 = this.gameState.getBoxState(0, 0)
    let winByd1 = true;
    for (let i = 1; i < 3; i++) {
      if (c1 === '' || c1 !== this.gameState.getBoxState(i, i)) {
        winByd1 = false;
        break;
      }
    }

    let c2 = this.gameState.getBoxState(0, 2)
    let winByd2 = true;
    for (let i = 1; i < 3; i++) {
      if (c2 === '' || c2 !== this.gameState.getBoxState(i, i % 2)) {
        winByd2 = false;
        break;
      }
    }
    this.winner = winByd1 ? c1 : winByd2 ? c2 : this.winner;
    return winByd1 || winByd2;
  }

  isEnd(): boolean {
    return this.isDraw() || this.isWinByCol() || this.isWinByRow() || this.isWinByDiagnal();
  }

  getWinner() {
    this.isEnd();
    return this.winner;
  }

  reset() {
    this.winner = '';
  }

}
