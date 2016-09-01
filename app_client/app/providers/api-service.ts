import { Http, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Storage, LocalStorage } from 'ionic-angular';

export class ApiService {
  protected baseApiUrl: string = "";
  protected storage: Storage;

  constructor() {
    this.storage = new Storage(LocalStorage);
  }

  protected defaultRequestOptions(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.checkAuthstatus(headers);
    let options = new RequestOptions({ headers: headers });

    return options;
  }

  private checkAuthstatus(headers: Headers): Headers {
    if (tokenNotExpired()) {
      let token = localStorage.getItem('id_token');
      headers.append('Authorization', `JWT ${token}`);
    }
    return headers;
  }
}
