import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PostsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiService {
  protected env: string = "development";
  private endPoints = {
    "development": {
      "url": "http://127.0.0.1:3030/api"
    },
    "production": {
      "url": "http://127.0.0.1:3030/api"
    }
  }

  constructor() {}

  protected get apiUrl():string {
    return this.endPoints[this.env].url;
  }
}
