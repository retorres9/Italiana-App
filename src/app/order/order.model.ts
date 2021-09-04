import { Producto } from '../pizza/pizza.model';
export class Order {
  userId: string;
  latlng: [string, string];
  reference: string;
  date: Date;
  state: States;
  cart: Producto;
}

export enum States {
  active = 'Active',
  pending = 'Pending',
  denied = 'Denied'
}
