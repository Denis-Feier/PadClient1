import {Product} from './product.model';

export interface OrderItem {
  quantity: number;
  product: Product;
}
