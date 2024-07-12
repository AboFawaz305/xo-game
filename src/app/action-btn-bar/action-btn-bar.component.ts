import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

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

  constructor() { }

  ngOnInit() { }

  restart() {
    this.restartEvent.emit();
  }

}
