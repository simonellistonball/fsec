import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'outputKeyValues'
})
export class OutputKeyValuesPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    Object.keys(value).map(k => `<span class="key">${k}</span><span class="value">${value[k]}</span>`);
  }
}
