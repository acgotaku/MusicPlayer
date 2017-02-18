import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
@Injectable()
export class MusicService {
  audio: any;

  constructor(
    private apiService: ApiService
  ) {
    this.audio = new Audio();
  }
  load(url: string): void {
    this.audio.src = url;
    this.audio.load();
  }
  getPlayList():void{
    this.apiService.getFMList().then(response => {
      console.log(response);
    });
  }
  play(url: string): void {
    this.load(url);
    this.audio.play()
  }

  setVolume(volume: number): void {
    this.audio.volume = volume;
  }

  formatTime(seconds:any):string {
    let minutes:any = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }
}
