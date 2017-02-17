import { Injectable } from '@angular/core';

@Injectable()
export class MusicService {
  audio: any;
  paused = false;
  constructor(

  ) {
    this.audio = new Audio();
  }
  load(url: string): void {
    this.audio.src = url;
    this.audio.load();
  }

  play(url: string): void {
    this.load(url);
    this.audio.play()
  }
  togglePause(): void {
    if (this.audio.paused) {
      this.paused = false;
      this.audio.play()
    } else {
      this.paused = true;
      this.audio.pause()
    }
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
