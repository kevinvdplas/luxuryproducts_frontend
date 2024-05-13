import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../Services/cart.service';
import {CurrencyPipe, NgIf} from '@angular/common';
import { Order } from '../models/order.model';
import { OrderService } from '../Services/order.service';
import {GiftcardService} from "../Services/giftcard.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Giftcard} from "../models/giftcard.model";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  public productsInCart: Product[];
  public giftcardCode: string;
  public giftcardPrice: number = 0;
  public giftcardPriceAfterOrder: number;

  private order: Order = {
    products: [],
    status: '',
    total_price: 0,
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private giftcardService: GiftcardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsInCart = this.cartService.getAllFromCart();
    this.cartService.$productsInCart.subscribe((products: Product[]) => {
      this.productsInCart = products;
    });
  }

  public calcTotalPrice() {
    let total_price = 0;
    for (const product of this.productsInCart) {
      total_price += product.price;
    }
    total_price -= this.giftcardPrice;
    // console.log(this.giftcardPrice);
    return total_price;
  }

  public removeProductFromCart(product_index: number) {
    this.cartService.removeProductFromCart(product_index);
  }

  public placeOrder() {
    // console.log(this.productsInCart);

    this.order.products = this.productsInCart;
    this.order.total_price = this.calcTotalPrice();

    this.orderService.postOrder(this.order).subscribe();
    alert('Thanks for your order!');

    this.giftcardPriceAfterOrder = this.giftcardPrice - this.order.total_price;
    this.giftcardPrice = this.giftcardPriceAfterOrder >= 0 ? this.giftcardPriceAfterOrder : 0;

    this.giftcardService.updateSaldo(this.giftcardCode, this.giftcardPrice).subscribe((giftcard: any) => {
        console.log(giftcard);
    });

    this.cartService.removeAllProductsFromCart();
    // this.router.navigateByUrl('/orders');
  }

  public useGiftcard(event: Event) {
    event.preventDefault();
    this.giftcardService.getGiftcardByCode(this.giftcardCode).subscribe((giftcard: any) => {
      if (giftcard.used) {
        alert('This giftcard has already been used');
      } else {
        this.giftcardPrice = giftcard.price;
        this.order.total_price = this.calcTotalPrice();
        // console.log(this.giftcardPrice);
      }
    });
  }

  protected readonly NgIf = NgIf;
  protected readonly Giftcard = Giftcard;
}
