import { Component, OnInit } from '@angular/core';

import '../styles.css';

@Component({
  selector:'music-app',
  template:`
    <h1>{{title}}</h1>
  `,
  styleUrls:['./app.component.css'],
})
export class AppComponent {
  title = 'Music Player';
}