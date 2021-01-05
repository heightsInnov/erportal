import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHyphen'
})
export class RemoveHyphenPipe implements PipeTransform {

  transform(value: string): string {
    if (value.includes('-')) {
      return value.replace('-', ' ');
    } else {
      return value;
    }
  }

}
