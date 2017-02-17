import { Component, OnInit } from '@angular/core';


@Component({
  selector:'music-player',
  templateUrl:'./player.component.html',
  styleUrls:['./player.component.css'],
})
export class PlayerComponent {
  title = 'Music Player';
  value=60;
  bufferValue=80;
  mode='buffer';
}