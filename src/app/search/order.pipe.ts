import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../pizza/pizza.model';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(product: Producto): Producto {

    return null;
  }

}
