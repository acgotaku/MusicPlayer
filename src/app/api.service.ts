import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ApiService {

  private FMUrl = 'http://music.163.com/api/radio/get';
  constructor(private jsonp: Jsonp){}
  getFMList(): Promise<any> {

    let params = new URLSearchParams();
    params.set('callback', 'JSONP_CALLBACK');
    return this.jsonp.get(this.FMUrl,{ search: params })
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);

  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}