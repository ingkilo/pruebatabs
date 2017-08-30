import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the VariablesGlobalesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class VariablesGlobalesProvider {
  private badge1 = 0;
  private badge2 = 0;
  private fcm= "";
  
  constructor(public http: Http) {
    
  }

  getBadge1() {
    return this.badge1;
  }

  setBadge1(param) {
    this.badge1 = param;
    return param;
  }

  getBadge2() {
    return this.badge2;
  }

  setBadge2(param) {
    this.badge2 = param;
    return param;
  }


  getFcm() {
    return this.fcm;
  }

  setFcm(param) {
    this.fcm = param;
    return param;
  }
}
