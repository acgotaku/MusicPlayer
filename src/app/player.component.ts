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
      { name: 'tsubasa', mp3Url: 'http://cc.stream.qqmusic.qq.com/C200003RHiW11PuozU.m4a?vkey=953990038ED8DD4114FD2255CA19023D5A69653ADF33EA4B98D747F00369497CB2EA5EAC055E9C751C49AFCCCD599C2EB3BC98423EF5CD4E&fromtag=0&guid=780782017', imgUrl: '' },
      { name: '女神のKISS', mp3Url: 'http://cc.stream.qqmusic.qq.com/C200002iWvsC1BA2lY.m4a?vkey=7E11E2EFFE8E70DE2FA56006E1E0F36C618EEAE7B4EE7905977BC55E7C966F55FEE07DDE2FADDA42E8C2CD7534EF188DAA169EE1B963E707&fromtag=0&guid=780782017', imgUrl: '' },
      { name: '恋', mp3Url: 'http://cc.stream.qqmusic.qq.com/C2000005QcgJ07urCy.m4a?vkey=91B09F439A51C889658A474DBDD41FE51D7CA531905C72FE46899AB6C890556078B513AD14FBE8B6D7A2E39F84A83CD6D61D8FCDB8688B4A&fromtag=0&guid=780782017', imgUrl: '' }];
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
    this.musicService.audio.onended = this.handleEnded.bind(this);
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
  handleTimeUpdate(e: any) :void {
    const elapsed = this.musicService.audio.currentTime;
    const duration = this.musicService.audio.duration || 0;
    this.progress = elapsed / duration;
    this.elapsed = this.musicService.formatTime(elapsed);
    this.duration = this.musicService.formatTime(duration);
  }
  handleEnded(e: any):void{
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