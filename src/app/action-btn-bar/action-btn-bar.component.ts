import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { XOSlot } from '../game-state-store.service';

@Component({
  selector: 'app-action-btn-bar',
  templateUrl: './action-btn-bar.component.html',
  styleUrls: ['./action-btn-bar.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
})
export class ActionBtnBarComponent implements OnInit {
  @Output() restartEvent = new EventEmitter<void>();
  @Output() playAgainstComputerEvent = new EventEmitter<XOSlot>()

  constructor() { }

  ngOnInit() { }

  restart() {
    this.restartEvent.emit();
  }

  playAgainstComputer(role: XOSlot) {
    this.playAgainstComputerEvent.emit(role)
  }

}
