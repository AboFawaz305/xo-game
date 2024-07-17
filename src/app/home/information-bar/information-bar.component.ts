import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GameStateStoreService, XOSlot } from 'src/app/game-state-store.service';

@Component({
  selector: 'app-information-bar',
  templateUrl: './information-bar.component.html',
  styleUrls: ['./information-bar.component.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class InformationBarComponent implements OnInit, OnChanges {
  protected player1Score = 0;
  protected player2Score = 0;
  protected currentTurn: XOSlot = '';
  @Input() update: boolean = false;

  constructor(private gameState: GameStateStoreService) { }

  ngOnInit() {
    this.player1Score = this.gameState.getPlayerScore(1);
    this.player2Score = this.gameState.getPlayerScore(2);
    this.currentTurn = this.gameState.getTurn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.player1Score = this.gameState.getPlayerScore(1);
    this.player2Score = this.gameState.getPlayerScore(2);
    this.currentTurn = this.gameState.getTurn();
    this.update = false;
  }

}
