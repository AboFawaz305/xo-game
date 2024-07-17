import { Component } from '@angular/core';
import { GameStateStoreService, XOSlot } from '../game-state-store.service';
import { GameLoopService } from '../game-loop.service';
import { PlayAgainstComputerService } from '../play-against-computer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  protected winner: string;
  protected isEnd: boolean;
  protected playAgainstComputerRole: XOSlot = '';
  protected updateBtns: boolean = false;

  constructor(protected gameState: GameStateStoreService, protected gameLoop: GameLoopService, private playAgainstComputer: PlayAgainstComputerService) {
    this.winner = gameState.getWinner();
    this.isEnd = gameState.getEnd();
  }

  changeTurn(checked: [boolean, number, number]) {
    if (!checked[0]) {
      return;
    }

    if (this.gameLoop.isEnd()) {
      this.playAgainstComputerRole = '';
      this.gameState.setEnd();
      const w = this.gameLoop.getWinner();
      this.gameState.setWinner(w);
      this.winner = this.gameState.getWinner();
      this.isEnd = this.gameState.getEnd();
      return;
    }

    this.gameState.passTurn();

    if (this.playAgainstComputerRole === this.gameState.getTurn()) {
      this.playAgainstComputer.play();
      this.updateBtns = !this.updateBtns;
      if (this.gameLoop.isEnd()) {
        this.playAgainstComputerRole = '';
        this.gameState.setEnd();
        const w = this.gameLoop.getWinner();
        this.gameState.setWinner(w);
        this.winner = this.gameState.getWinner();
        this.isEnd = this.gameState.getEnd();
        return;
      }
      this.gameState.passTurn()
    }

  }

  reset() {
    this.gameState.reset();
    this.winner = '';
    this.isEnd = false;
    this.playAgainstComputerRole = '';
    this.updateBtns = !this.updateBtns;
  }

  startPlayAgainstComputer(role: XOSlot) {
    this.reset();
    this.playAgainstComputerRole = role;
    this.playAgainstComputer.start(role);
    if (role === 'x') {
      this.playAgainstComputer.play();
      this.updateBtns = !this.updateBtns;
      this.gameState.passTurn()
    }
  }

}
