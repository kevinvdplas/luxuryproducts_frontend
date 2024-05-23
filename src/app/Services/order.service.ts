import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public postOrder(OrderRequest: {order: Order, giftcards: any[]}): Observable<Order> {
    return this.http.post<Order>(environment.base_url + '/orders', OrderRequest);
  }

  public getOrdersFromCurrentUser(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.base_url + '/orders');
  }
}
