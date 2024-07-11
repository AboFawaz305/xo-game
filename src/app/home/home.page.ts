import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  protected turn: 'x' | 'o' | '';

  constructor() {
    this.turn = 'x';
  }

  changeTurn(checked: boolean) {
    if (!checked) {
      return;
    }

    this.reverseTurn()
  }

  reverseTurn() {
    if (this.turn === 'x')
      this.turn = 'o'
    else
      this.turn = 'x'
  }
}
