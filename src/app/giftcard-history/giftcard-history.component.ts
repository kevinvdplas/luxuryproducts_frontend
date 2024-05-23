import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Routes} from "@angular/router";
import {Order} from "../models/order.model";
import {OrderService} from "../Services/order.service";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-giftcard-history',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './giftcard-history.component.html',
  styleUrl: './giftcard-history.component.scss'
})
export class GiftcardHistoryComponent implements OnInit {
  public giftcard_id: number;
  public orderList: Order[];
  constructor(private routes: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.getGiftcardHistory()
  }

  public getGiftcardHistory(): void {
    this.routes.params.subscribe(params => {
      this.giftcard_id = params['id'];
    })

    this.orderService.getOrderFromGiftcard(this.giftcard_id).subscribe((orders: Order[]) => {
        this.orderList = orders;
    });
  }
}
