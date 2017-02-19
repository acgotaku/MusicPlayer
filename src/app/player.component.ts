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
  elapsed: string;
  duration: string;
  music: Music[];
  index: number;
  song: Music;
  url = 'http://112.29.201.99/m10.music.126.net/20170218112127/d5c4218fe8996bd23ba7044d0495c4be/ymusic/f23e/d92f/9bf2/99d3022baa72812d1ff395849164bae7.mp3?wshc_tag=0&wsts_tag=58a7b7db&wsid_tag=701ae744&wsiphost=ipdbm';
  constructor(
    private musicService: MusicService
  ) { }
  ngOnInit(): void {
    this.music = [
      { name: 'tsubasa', mp3Url: 'http://cc.stream.qqmusic.qq.com/C200003RHiW11PuozU.m4a?vkey=F234E35724E1C43D13A338E3130840D81B3730B2DA6E22E1796DD83987FB59D57711F6E098602A1E801AF3B4BE78357F5304A47ED22D678B&fromtag=0&guid=780782017', imgUrl: '' },
      { name: '女神のKISS', mp3Url: 'http://cc.stream.qqmusic.qq.com/C200002iWvsC1BA2lY.m4a?vkey=9E2A4686D68499DA16B9E2AFFBFAF653171FE0D16B119034EDC01245EE81BCF3745BEADA028670FAE155343376192C2F9C5E2A263A507878&fromtag=0&guid=780782017', imgUrl: '' },
      { name: '恋', mp3Url: 'http://cc.stream.qqmusic.qq.com/C200001kLQTa3rD7VD.m4a?vkey=E98EF7A9F2A11E821E15795E4228C87B3FFD40F467568C4586665CF33501B0007146D4351D8003410109C60671D4E4A8A56D9B3C79DFED6E&fromtag=0&guid=780782017', imgUrl: '' }];
    // this.musicService.getPlayList();
    // this.musicService.load(this.url);
    // this.musicService.audio.onended = this.handleEnded.bind(this);
    // this.musicService.audio.onloadedmetadata =this.handleTimeUpdate.bind(this);
    // this.musicService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);
  }
  ngOnChanges(progress:number):void{
    console.log(progress);
  }
  setMusic(song: Music, index: number): void {
    this.song = song;
    this.index = index;
    this.playMusic(song);
  }
  playMusic(song: Music): void {
    this.musicService.play(song.mp3Url);
    this.paused = false;
    this.musicService.audio.onloadedmetadata = this.handleTimeUpdate.bind(this);
    this.musicService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);
  }
  playNext(): void {
    this.index =(this.index+1)%this.music.length;
    this.song =this.music[this.index];
    this.playMusic(this.song);
  }
  playPrev(): void {
    this.index =(this.index-1)%this.music.length;
    this.song =this.music[this.index];
    this.playMusic(this.song);
  }
  handleTimeUpdate(e: any) {
    const elapsed = this.musicService.audio.currentTime;
    const duration = this.musicService.audio.duration || 0;
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