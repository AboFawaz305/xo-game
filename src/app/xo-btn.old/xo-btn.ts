import { Component, Output, EventEmitter, Input } from '@angular/core'

@Component(
  {
    selector: 'xo-btn',
    templateUrl: 'xo-btn.html',
    styleUrl: 'xo-btn.scss'
  })

export class XOBtn {
  @Input() turn: 'x' | 'o' | '';
  @Output() checkEvent;
  protected state: '' | 'x' | 'o';
  protected wrongChoice: boolean;
  protected stateIcon: 'close-outline' | 'ellips-outline' | '';

  constructor() {
    this.state = '';
    this.turn = ''
    this.checkEvent = new EventEmitter<boolean>()
    this.wrongChoice = false;
    this.stateIcon = ''
  }

  check(value: 'x' | 'o') {
    if (this.state === '') {
      this.wrongChoice = true;
      setTimeout(() => { this.wrongChoice = false }, 500)
      this.checkEvent.emit(false);
    }

    this.state = value;
    if (value === 'x')
      this.stateIcon = 'close-outline'
    else
      this.stateIcon = 'ellips-outline'
    this.checkEvent.emit(true)
  }
}
