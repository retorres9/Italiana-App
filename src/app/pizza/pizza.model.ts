import { Price } from './price.model'

export class Producto{
  id: string;
  name: string;
  description: string;
  prices: Price [];
  image: string;
  quantity?: number;
  selectedType: number;
  totalAmount: number;
  type: string;
}

