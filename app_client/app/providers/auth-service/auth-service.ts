import { Injectable } from '@angular/core';
import { ApiService } from '../api-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService extends ApiService {
  private apiUrl: string = `${this.baseApiUrl}/auth`;
  private _currentUser: any;

  public isAuthenticated: boolean = false;

  constructor(private http: Http) {
    super();
    this.currentUser().catch((err) => {
      console.log(err);
    });
  }

  signup(username: string, password: string) {
    let body = JSON.stringify({
      username: username,
      password: password
    });
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/signup`, body, this.defaultRequestOptions())
        .map(res => res.json())
        .subscribe( (data: AuthOutput) => {
          if (data.state !== 'success') {
            reject(data.message);
          }
          this._currentUser = data.user;
          this.isAuthenticated = true;
          this.storage.set('id_token', data.token);
          resolve(this._currentUser);
        });
    });
  }

  signin(username: string, password: string) {
    let body = JSON.stringify({
      username: username,
      password: password
    });
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/signin`, body, this.defaultRequestOptions())
        .map(res => res.json())
        .subscribe( (data: AuthOutput) => {
          if (data.state !== 'success') {
            reject(data.message);
          }
          this._currentUser = data.user;
          this.isAuthenticated = true;
          this.storage.set('id_token', data.token);
          resolve(this._currentUser);
        });
    });
  }

  signout() {
    return new Promise((resolve) => {
      this.http.get(`${this.apiUrl}/signout`, this.defaultRequestOptions())
        .subscribe(() => {
          this._currentUser = null;
          this.isAuthenticated = false;
          this.storage.remove('id_token');
          resolve();
        });
    });
  }

  currentUser() {
    if (this._currentUser) {
      this.isAuthenticated = true;
      return Promise.resolve(this._currentUser);
    }

    if (!tokenNotExpired()) {
      this.isAuthenticated = false;
      return Promise.reject({message: "Not currentUser or the token is expired"});
    }

    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}/me`, this.defaultRequestOptions())
        .map(res => res.json())
        .subscribe((data: UserOutput) => {
          if (data.err) {
            reject(data.err);
          }
          this._currentUser = data.user;
          this.isAuthenticated = true;
          resolve(this._currentUser);
        });
    });
  }
}

interface AuthOutput {
  state: string;
  user: any;
  token: any;
  message: string;
}

interface UserOutput {
  user: any;
  err: Error;
}
