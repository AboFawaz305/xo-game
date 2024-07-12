import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  imports: [
    IonicModule
  ],
  selector: 'xo-btn',
  templateUrl: './xo-btn.component.html',
  styleUrls: ['./xo-btn.component.scss'],
  standalone: true
})
export class XoBtnComponent {
  @Input() turn: 'x' | 'o' | '';
  @Input() col: number;
  @Input() row: number;
  @Input() isEnd: boolean;
  @Output() checkEvent;
  protected state: '' | 'x' | 'o';
  protected wrongChoice: boolean;
  protected stateIcon: 'close-outline' | 'ellipse-outline' | '';

  constructor() {
    this.state = '';
    this.turn = ''
    this.checkEvent = new EventEmitter<[boolean, number, number]>()
    this.wrongChoice = false;
    this.stateIcon = ''
    this.col = 0;
    this.row = 0;
    this.isEnd = false;
  }

  check(value: 'x' | 'o' | '') {
    if (this.isEnd) {
      return;
    }
    if (this.state !== '') {
      this.wrongChoice = true;
      setTimeout(() => { this.wrongChoice = false }, 1000)
      this.checkEvent.emit([false, this.row, this.col]);
      return;
    }

    this.state = value;
    if (value === 'x')
      this.stateIcon = 'close-outline'
    else
      this.stateIcon = 'ellipse-outline'
    this.checkEvent.emit([true, this.row, this.col])
  }
}
