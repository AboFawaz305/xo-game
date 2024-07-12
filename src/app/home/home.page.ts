import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  protected turn: 'x' | 'o' | '';
  protected progress: ('x' | 'o' | '')[][];
  protected winner: '' | 'draw' | 'X wins' | 'O wins';
  protected isEnd: boolean;

  constructor() {
    this.turn = 'x';
    this.progress = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]
    this.winner = '';
    this.isEnd = false;
  }

  changeTurn(checked: [boolean, number, number]) {
    if (!checked[0]) {
      return;
    }

    this.progress[checked[1]][checked[2]] = this.turn;
    if (this.isGameEnd()) {
      this.isEnd = true;
    }
    this.reverseTurn()
  }

  reverseTurn() {
    if (this.turn === 'x')
      this.turn = 'o'
    else
      this.turn = 'x'
  }

  isGameEnd() {
    // Check if the game is a draw
    let draw = true;
    for (let i = 0; i < this.progress.length; i++) {
      const crow = this.progress[i];
      for (let j = 0; j < crow.length; j++) {
        const cbox = crow[j];
        if (cbox == '') {
          draw = false;
        }
      }
    }
    if (draw) {
      this.winner = 'draw'
      return true;
    }

    // Check For winning by row case
    for (let i = 0; i < this.progress.length; i++) {
      const crow = this.progress[i];
      if (crow[0] !== '' && crow[1] !== '' && crow[2] !== '' && crow[0] === crow[1] && crow[1] === crow[2]) {
        this.winner = crow[0] === 'x' ? 'X wins' : 'O wins';
        return true;
      }
    }

    // check for winnig by col case
    for (let i = 0; i < this.progress.length; i++) {
      if (this.progress[0][i] !== '' && this.progress[1][i] !== '' && this.progress[2][i] !== '' && this.progress[0][i] === this.progress[1][i] && this.progress[1][i] === this.progress[2][i]) {
        this.winner = this.progress[0][i] === 'x' ? 'X wins' : 'O wins';
        return true;
      }
    }

    // check for winnig by diagonal
    if (
      ((this.progress[0][0] !== '' && this.progress[1][1] !== '' && this.progress[2][2] !== '') &&
        (this.progress[0][0] === this.progress[1][1] && this.progress[1][1] === this.progress[2][2])) ||
      ((this.progress[0][2] !== '' && this.progress[1][1] !== '' && this.progress[2][0] !== '') &&
        (this.progress[0][2] === this.progress[1][1] && this.progress[1][1] === this.progress[2][0]))
    ) {
      this.winner = this.progress[1][1] === 'x' ? 'X wins' : 'O wins';
      return true;
    }

    return false;
  }
}
