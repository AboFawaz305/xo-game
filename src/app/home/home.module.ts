import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { XoBtnComponent } from '../xo-btn/xo-btn.component';
import { GameStateStoreService } from '../game-state-store.service';
import { ActionBtnBarComponent } from '../action-btn-bar/action-btn-bar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    XoBtnComponent,
    ActionBtnBarComponent
  ],
  declarations: [HomePage],
  providers: [GameStateStoreService]
})
export class HomePageModule { }
