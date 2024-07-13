import { Injectable } from '@angular/core';

type XOSlot = 'x' | 'o' | '';

@Injectable({
  providedIn: 'root'
})
export class GameStateStoreService {

  constructor() { }

  init() {
    if (localStorage.getItem('state') !== null) {
      return;
    }
    localStorage.setItem('state', JSON.stringify([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]))
    if (localStorage.getItem('turn') !== null) {
      return;
    }
    localStorage.setItem('turn', 'x');
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

  reset() {
    localStorage.setItem('state', JSON.stringify([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]))
    localStorage.setItem('turn', 'x');
  }
}
