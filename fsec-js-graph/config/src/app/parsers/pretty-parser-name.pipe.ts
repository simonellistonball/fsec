import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyParserName'
})
export class PrettyParserNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.replace(/^fsec\.parser\.(.*)/, '$1').replace(/Parser$/, '');
  }
}
