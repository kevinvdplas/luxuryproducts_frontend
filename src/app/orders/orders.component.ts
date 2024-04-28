import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Services/order.service';
import { Order } from '../models/order.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  public orderList: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService
      .getOrdersFromCurrentUser()
      .subscribe((orders: Order[]) => {
        this.orderList = orders;
      });
  }
}
