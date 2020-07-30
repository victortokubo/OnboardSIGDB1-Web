import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpjPipe'
})
export class CnpjPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length != 14) {
      return value;
    }
    
    return value.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/, '$1.$2.$3/$4-$5');
  }

}
