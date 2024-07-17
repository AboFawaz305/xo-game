import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GameStateStoreService, XOSlot } from '../game-state-store.service';
import { state } from '@angular/animations';

@Component({
  imports: [
    IonicModule
  ],
  selector: 'xo-btn',
  templateUrl: './xo-btn.component.html',
  styleUrls: ['./xo-btn.component.scss'],
  standalone: true
})
export class XoBtnComponent implements OnChanges {
  @Input() state: 'x' | 'o' | '';
  @Input() col: number;
  @Input() row: number;
  @Input() isEnd: boolean;
  @Input() update: boolean = false;
  @Input() playAgainstComputerRule: XOSlot = '';
  @Output() checkEvent;
  protected hide = true;
  protected wrongChoice: boolean;
  protected stateIcon: 'close-outline' | 'ellipse-outline' | '';

  constructor(private gameState: GameStateStoreService) {
    this.checkEvent = new EventEmitter<[boolean, number, number]>()
    this.wrongChoice = false;
    this.stateIcon = ''
    this.col = 0;
    this.row = 0;
    this.isEnd = false;
    this.state = ''
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.state = this.gameState.getBoxState(this.row, this.col);
    this.stateIcon = this.state === 'x' ? 'close-outline' : this.state === 'o' ? 'ellipse-outline' : '';
    this.hide = this.state === '';

  }

  check() {
    if (this.isEnd) {
      return;
    }

    if (this.playAgainstComputerRule === this.gameState.getTurn()) {
      this.checkEvent.emit([true, this.row, this.col])
      return;
    }

    if (this.gameState.getBoxState(this.row, this.col) !== '') {
      this.wrongChoice = true;
      setTimeout(() => { this.wrongChoice = false }, 1000)
      this.checkEvent.emit([false, this.row, this.col]);
      return;
    }

    this.gameState.MarkBoxState(this.row, this.col)
    //@ts-ignore
    this.state = this.gameState.getBoxState(this.row, this.col);
    this.hide = this.state === '';
    this.stateIcon = this.state === 'x' ? 'close-outline' : this.state === 'o' ? 'ellipse-outline' : '';
    this.checkEvent.emit([true, this.row, this.col])
  }
}
