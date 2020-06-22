import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumList'
})
export class EnumListPipe implements PipeTransform {

  transform(value: any) {
    const keys = Object.keys(value).filter(k => value[k as any]);

    return keys.map(key => ({
      id: value[key],
      name: key,
      text: key.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')
    }));
  }

}
