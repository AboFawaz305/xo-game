import { Injectable } from '@angular/core';

export type XOSlot = 'x' | 'o' | '';

@Injectable({
  providedIn: 'root'
})
export class GameStateStoreService {

  constructor() { }

  init() {
    if (localStorage.getItem('state') === null) {
      localStorage.setItem('state', JSON.stringify([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ]))
    }
    if (localStorage.getItem('turn') === null) {
      localStorage.setItem('turn', 'x');
    }
    if (localStorage.getItem('isEnd') === null) {
      localStorage.setItem('isEnd', 'false');
    }
    if (localStorage.getItem('winner') === null) {
      localStorage.setItem('winner', '');
    }
  }

  getBoxState(row: number, col: number): XOSlot {
    const ls = localStorage.getItem('state');
    if (ls === null) {
      console.error('game state not initialized')
      return '';
    }
    const state = JSON.parse(ls);
    return state[row][col]
  }

  MarkBoxState(row: number, col: number) {
    const ls = localStorage.getItem('state');
    if (ls === null) {
      console.error('game state not initialized')
      return;
    }
    const state = JSON.parse(ls);
    state[row][col] = this.getTurn();
    localStorage.setItem('state', JSON.stringify(state))
  }

  getTurn(): XOSlot | null {
    const ls = localStorage.getItem('turn');
    if (ls === null) {
      console.error('game state not initialized')
      return null;
    }
    //@ts-ignore
    return ls;
  }

  passTurn() {
    let turn = this.getTurn()
    if (turn === null) {
      return
    }
    turn = turn === 'x' ? 'o' : 'x';
    localStorage.setItem('turn', turn)
  }

  getEnd(): boolean {
    //@ts-ignore
    const e = JSON.parse(localStorage.getItem('isEnd'));
    return e;
  }

  setEnd() {
    localStorage.setItem('isEnd', 'true')
  }

  getWinner(): string {
    const w = localStorage.getItem('winner');
    //@ts-ignore
    return w;
  }

  setWinner(w: XOSlot) {
    localStorage.setItem('winner',
      w === 'x' ? 'X wins' : w === 'o' ? 'O wins' : 'draw'
    )
  }

  reset() {
    localStorage.setItem('state', JSON.stringify([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]))
    localStorage.setItem('turn', 'x');
    localStorage.setItem('isEnd', 'false');
    localStorage.setItem('winner', '');
  }
}
