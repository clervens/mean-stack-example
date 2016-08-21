import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Pipe({
  name: 'jsDate',
  pure: false
})
export class JsDatePipe implements PipeTransform {
  transform(value: string, []): Date {
    return new Date(value);
  }
}
