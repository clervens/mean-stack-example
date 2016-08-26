import { Http, Headers, RequestOptions } from '@angular/http';

export class ApiService {
  protected baseApiUrl: string = "/";

  constructor() {}

  protected defaultRequestOptions(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return options;
  }
}
