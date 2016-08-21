import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Post } from '../../models/post';

/*
  Generated class for the PostsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PostsService {
  data: any;

  constructor(private http: Http) {
    this.data = null;
  }

  load(): Promise<Post[]> {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(`http://localhost:3030/api/posts`)
        .map(res => res.json())
        .subscribe((data: PostsOutput) => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data.posts;
          resolve(this.data);
        });
    });
  }

  add(post: Post): Promise<Post> {
    let body = JSON.stringify(post);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(`http://localhost:3030/api/posts`, body, options)
        .map(res => res.json())
        .subscribe((data: PostOutput) => {
          if (data.err) {
            reject(data.err);
          }
          resolve(data.post);
        });
    });
  }
}


interface PostsOutput {
  posts: Array<Post>;
  err: any;
}

interface PostOutput {
  post: Post,
  postUrl: string;
  requestUrl: string;
  err: any;
}
