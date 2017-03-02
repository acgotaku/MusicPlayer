import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player.component';
import { MusicService } from './music.service';
import { ApiService } from './api.service';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    PlayerComponent
  ],
  providers: [MusicService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

