import { Component } from '@angular/core';
import { GameStateStoreService } from './game-state-store.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private gameStateService: GameStateStoreService) {
    gameStateService.init();
  }
}
