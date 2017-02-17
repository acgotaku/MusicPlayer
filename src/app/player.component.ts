import { Component, OnInit } from '@angular/core';

import { MusicService } from './music.service';
@Component({
  selector: 'music-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  title = 'Music Player';
  progress = 0;
  volume = 0.5;
  elapsed:string;
  duration:string;
  url = 'http://m10.music.126.net/20170217150845/3274b26b4056dd095173c482f02bfc8b/ymusic/f23e/d92f/9bf2/99d3022baa72812d1ff395849164bae7.mp3';
  constructor(
    private musicService: MusicService
  ) { }
  ngOnInit(): void {
     this.musicService.play(this.url);
    // this.musicService.audio.onended = this.handleEnded.bind(this);
    this.musicService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);
  }
  handleTimeUpdate(e:any) {
    const elapsed = this.musicService.audio.currentTime;
    const duration = this.musicService.audio.duration;
    this.progress = elapsed / duration;
    this.elapsed = this.musicService.formatTime(elapsed);
    this.duration = this.musicService.formatTime(duration);
  }
  volumeUp(): void {
    if (this.volume < 1) {
      this.volume = this.volume + 0.1;
      this.musicService.setVolume(this.volume);
    }

  }
  volumeDown(): void {
    if (this.volume > 0) {
      this.volume = this.volume - 0.1;
      this.musicService.setVolume(this.volume);
    }
  }
  setVolume(): void {
    this.musicService.setVolume(this.volume);
  }
  pause(): void {
    this.musicService.togglePause();
  }
  updateProgress(): void {
    this.musicService.audio.currentTime = this.progress * this.musicService.audio.duration;
  }
}