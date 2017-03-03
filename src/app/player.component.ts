import { Component, OnInit } from '@angular/core';

import { MusicService } from './music.service';

import { Music } from './music';

import { PlayList } from './playlist';

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
  playLists: PlayList[];
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
        this.source = 'netease';
        this.searchPlayList(this.keyword);
        break;
      case 2:
        this.source = 'qq';
        this.searchMusic(this.keyword);
        break;
      case 3:
        this.source = 'xiami';
        this.searchMusic(this.keyword);
        break;
      default:
        this.source = 'netease';
        this.searchMusic(this.keyword);
    }

  }
  searchMusic(keyword: string): void {
    this.keyword = keyword;
    this.musicService.getMusicList(keyword, this.source).then(musicList => this.music = musicList);
  }
  searchPlayList(keyword: string): void {
    this.music=[];
    this.keyword = keyword;
    this.musicService.searchPlayList(keyword, this.source).then(playLists => this.playLists = playLists);
  }
  getPlayList(playlist:PlayList,index:number):void{
    this.musicService.getPlayList(playlist.id, this.source).then(musicList => this.music = musicList);
    this.playLists=[];
  }
  setMusic(song: Music, index: number): void {
    this.selectedSong = song;
    this.index = index;
    this.playMusic(song);
  }
  playMusic(song: Music): void {
    this.musicService.getTrackUrl(song.id, this.source).then(url => {
      if (url ==""){
        this.playNext();
        return;
      }
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
    this.volume = this.volume + 0.1;
    if (this.volume > 1) {
      this.volume = 1;
    }
    this.musicService.setVolume(this.volume);
  }
  volumeDown(): void {
    this.volume = this.volume - 0.1;
    if (this.volume < 0) {

      this.volume = 0;
    }
    this.musicService.setVolume(this.volume);
  }
  setVolume(volume: number): void {
    this.volume = volume;
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