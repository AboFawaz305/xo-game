import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GameStateStoreService } from '../game-state-store.service';

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
  @Output() checkEvent;
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
    this.stateIcon = this.state === 'x' ? 'close-outline' : this.state === 'o' ? 'ellipse-outline' : '';
  }

  check() {
    if (this.isEnd) {
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
    this.stateIcon = this.state === 'x' ? 'close-outline' : this.state === 'o' ? 'ellipse-outline' : '';
    this.checkEvent.emit([true, this.row, this.col])
  }
}
