import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../Services/cart.service';
import {CurrencyPipe} from '@angular/common';
import { Order } from '../models/order.model';
import { OrderService } from '../Services/order.service';
import {GiftcardService} from "../Services/giftcard.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  public productsInCart: Product[];
  public giftcardCode: string;
  public giftcardPrice: number = 0;
  public travelFee: number = 5;
  public newGiftcardValue: number = 0;

  private order: Order = {
    products: [],
    status: '',
    total_price: 0,
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private giftcardService: GiftcardService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productsInCart = this.cartService.getAllFromCart();
    this.cartService.$productsInCart.subscribe((products: Product[]) => {
      this.productsInCart = products;
    });
  }

  public removeProductFromCart(product_index: number) {
    this.cartService.removeProductFromCart(product_index);
  }

  public calculatePriceFromItems(): number {
    let total_price: number = 0;

    for (const product of this.productsInCart) {
      total_price += product.price;
    }

    total_price += this.travelFee;

    if (total_price < 0) {
        total_price = 0;
    }

    this.newGiftcardValue = this.giftcardPrice - total_price;

    this.calculateNewGiftcardValue();
    this.calculatePriceFromGiftcard(total_price);

    return total_price;
  }

  public calculatePriceFromGiftcard(total_price: number) {
    total_price -= this.giftcardPrice;

    if (total_price < 0) {
      total_price = 0;
    }

    return total_price;
  }

  public calculateNewGiftcardValue() {
    if (this.newGiftcardValue < 0) {
      this.newGiftcardValue = 0;
    }

    return this.newGiftcardValue;
  }

  public placeOrder() {
    let allProductsInCart = this.order.products = this.productsInCart;
    this.order.total_price = this.calculatePriceFromGiftcard(this.calculatePriceFromItems());

    if (allProductsInCart.length === 0) {
      Swal.fire("Geen producten in winkelmand", "Voeg producten toe aan je winkelmand", "error")
    } else {
      this.orderService.postOrder(this.order).subscribe();
      this.updateGiftcardPrice();
      Swal.fire("Bestelling geplaatst!", "Je bestelling is geplaatst", "success");
    }
  }

  public updateGiftcardPrice() {
    this.giftcardService.updateSaldoFromOrder(this.giftcardCode, this.newGiftcardValue).subscribe();
    this.cartService.removeAllProductsFromCart();
  }

  public useGiftcard() {
    this.giftcardService.getGiftcardByCode(this.giftcardCode).subscribe((giftcard: any) => {
      if (giftcard.used ) {
        Swal.fire("Giftcard niet bruikbaar", "Deze giftcard is niet meer bruikbaar", "error");
      } else if (giftcard.price <= 0) {
        Swal.fire("Giftcard niet bruikbaar", "Deze giftcard heeft geen saldo", "error");
      } else {
        this.giftcardPrice = giftcard.price;
        this.order.total_price = this.calculatePriceFromGiftcard(this.calculatePriceFromItems());
      }
    });
  }
}