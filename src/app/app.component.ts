import { Component, OnInit } from '@angular/core';

import '../styles.css';

import 'normalize.css/normalize.css';

@Component({
  selector:'music-app',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.css'],
})
export class AppComponent {
  title = 'Music Player';
  value=60;
}