import { CustomUser } from './customUser.model';
import { Product } from './product.model';

export class Order {
  public id?: number;
  public customUser?: CustomUser;
  public products: Product[];
  public status: string;
  public total_price: number;
}
