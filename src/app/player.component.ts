import { Component, OnInit } from '@angular/core';

import { MusicService } from './music.service';

import { Music } from './music';

@Component({
  selector: 'music-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  title = 'Music Player';
  progress = 0;
  volume = 0.5;
  paused = true;
  keyword = 'tsubasa';
  elapsed: string;
  duration: string;
  source = 'netease';
  music: Music[];
  index: number;
  selectedSong: Music;
  constructor(
    private musicService: MusicService
  ) { }
  ngOnInit(): void {

    // this.musicService.load(this.url);
    // this.musicService.audio.onended = this.handleEnded.bind(this);
    // this.musicService.audio.onloadedmetadata =this.handleTimeUpdate.bind(this);
    // this.musicService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);
  }
  setSource(index: number): void {
    switch (index) {
      case 1:
        this.source = 'qq';
        break;
      case 2:
        this.source = 'xiami';
        break;
      default:
        this.source = 'netease';
    }
    this.searchMusic(this.keyword);

  }
  searchMusic(keyword: string): void {
    this.keyword =keyword;
    this.musicService.getPlayList(keyword, this.source).then(musicList => this.music = musicList);
  }
  setMusic(song: Music, index: number): void {
    this.selectedSong = song;
    this.index = index;
    this.playMusic(song);
  }
  playMusic(song: Music): void {
    this.musicService.getTrackUrl(song.id,this.source).then(url => {
      this.musicService.play(url);
    });
    this.paused = false;
    this.musicService.audio.onloadedmetadata = this.handleTimeUpdate.bind(this);
    this.musicService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);
    this.musicService.audio.onended = this.handleEnded.bind(this);
  }
  playNext(): void {
    this.index = (this.index + 1) % this.music.length;
    this.selectedSong = this.music[this.index];
    this.playMusic(this.selectedSong);
  }
  playPrev(): void {
    this.index = (this.index - 1) % this.music.length;
    this.selectedSong = this.music[this.index];
    this.playMusic(this.selectedSong);
  }
  handleTimeUpdate(e: any): void {
    const elapsed = this.musicService.audio.currentTime;
    const duration = this.musicService.audio.duration || 0;
    this.progress = elapsed / duration;
    this.elapsed = this.musicService.formatTime(elapsed);
    this.duration = this.musicService.formatTime(duration);
  }
  handleEnded(e: any): void {
    this.playNext();
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
  updateProgress(): void {
    this.musicService.audio.currentTime = this.progress * this.musicService.audio.duration;
  }
  pause(): void {
    if (this.paused) {
      this.paused = false;
      this.musicService.audio.play();
    } else {
      this.paused = true;
      this.musicService.audio.pause();
    }
  }
}