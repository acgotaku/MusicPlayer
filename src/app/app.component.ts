import { Component, OnInit } from '@angular/core';
import 'normalize.css/normalize.css';

import '../styles.css';

@Component({
  selector:'music-app',
  template:`
  <music-player></music-player>
  `,
  styleUrls:['./app.component.css'],
})
export class AppComponent {
}