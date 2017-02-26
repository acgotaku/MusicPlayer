import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Music } from './music';

@Injectable()
export class ApiService {

  private FMUrl = 'http://music.163.com/api/radio/get';
  private searchUrl='http://61.183.143.67:8088/api/search';
  private trackUrl='http://61.183.143.67:8088/api/track';
  constructor(private http: Http){}
  getMusicList(keyword:string,source:string): Promise<Music[]>{
    const url = `${this.searchUrl}?keyword=${keyword}&source=${source}`
    console.log(url);
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Music[])
               .catch(this.handleError);
  }
  getTrackUrl(id:number,source:string): Promise<string>{
    const url = `${this.trackUrl}?id=${id}&source=${source}&country=japan`
    console.log(url);
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().mp3Url as string)
               .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}