import { Injectable } from '@angular/core';

import { Music } from './music';

import { PlayList } from './playlist';

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
  getMusicList(keyword:string,source:string):Promise<Music[]>{
    return this.apiService.getMusicList(keyword,source);
  }
  getTrackUrl(id:number,source:string):Promise<string>{
    return this.apiService.getTrackUrl(id,source);
  }
  getPlayList(id:number,source:string):Promise<Music[]>{
    return this.apiService.getPlayList(id,source);
  }
  searchPlayList(keyword:string,source:string):Promise<PlayList[]>{
    return this.apiService.searchPlayList(keyword,source);
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
