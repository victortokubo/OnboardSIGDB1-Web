import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfPipe'
})
export class CpfPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length != 11) {
      return value;
    }
    
    return value.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4');
  }

}
