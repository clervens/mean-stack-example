import {Pipe, ChangeDetectorRef, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AsyncPipe} from '@angular/common';

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date, []): string {
    var result: string;

    // current time
    let now = new Date().getTime();

    // time since message was sent in seconds
    let delta = (now - value.getTime()) / 1000;

    // format string
    if (delta < 10) {
      result = 'now';
    } else if (delta < 60) { // sent in last minute
      result = Math.floor(delta) + ' seconds ago';
    } else if (delta < 3600) { // sent in last hour
      result = Math.floor(delta / 60) + ' minutes ago';
    } else if (delta < 86400) { // sent on last day
      result = Math.floor(delta / 3600) + ' hours ago';
    } else { // sent more than one day ago
      result = Math.floor(delta / 86400) + ' days ago';
    }
    return result;
  }
}


// =========================
// ||        WIP          ||
// =========================

// @Pipe({
//   name: 'timeAgo',
//   pure: false
// })
export class AsyncTimeAgoPipe /*extends AsyncPipe*/ implements PipeTransform {
  value:Date;
  timer:Observable<string>;

  // constructor(ref:ChangeDetectorRef) {
  //   super(ref);
  // }

  transform(obj:any, args?:any[]):any {
    if (obj instanceof Date) {
      this.value = obj;

      if(!this.timer) {
        this.timer = this.getObservable();
      }

      // return super.transform(this.timer);
    }

    // return super.transform(obj);
  }

  private getObservable() {
    return Observable.interval(10000).startWith(0).map(()=> {
      var result:string;
      // current time
      let now = new Date().getTime();

      // time since message was sent in seconds
      let delta = (now - this.value.getTime()) / 1000;

      // format string
      if (delta < 10) {
        result = 'now';
      } else if (delta < 60) { // sent in last minute
        result = Math.floor(delta) + ' seconds ago';
      } else if (delta < 3600) { // sent in last hour
        result = Math.floor(delta / 60) + ' minutes ago';
      } else if (delta < 86400) { // sent on last day
        result = Math.floor(delta / 3600) + ' hours ago';
      } else { // sent more than one day ago
        result = Math.floor(delta / 86400) + ' days ago';
      }
      return result;
    });
  };
}
