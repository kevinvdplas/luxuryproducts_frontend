import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../Services/cart.service';
import {CurrencyPipe} from '@angular/common';
import { Order } from '../models/order.model';
import { OrderService } from '../Services/order.service';
import {GiftcardService} from "../Services/giftcard.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import Swal from "sweetalert2";
import {Giftcard} from "../models/giftcard.model";
import {NewGiftcardInfo} from "../models/newGiftcardInfo.model";
import {catchError, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  public productsInCart: Product[];
  public giftcardsUsed: Giftcard[] = [];
  public newGiftcardInfo: NewGiftcardInfo[] = [];
  public giftcardCode: string;
  public giftcardPrice: number = 0;
  public travelFee: number = 5;

  private order: Order = {
    products: [],
    status: '',
    total_price: 0,
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private giftcardService: GiftcardService
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

  public placeOrder() {
    let allProductsInCart = this.order.products = this.productsInCart;

    let allGiftcardsUsed = [];
    this.newGiftcardInfo.forEach(giftcard => {
      allGiftcardsUsed.push(giftcard.giftcard_id);
    })

    this.order.total_price = this.calculatePriceFromGiftcard(this.calculatePriceFromItems());

    if (allProductsInCart.length === 0) {
      Swal.fire("Geen producten in winkelmand", "Voeg producten toe aan je winkelmand", "error")
    } else {
      let OrderRequest = {
        order: this.order,
        giftcards: allGiftcardsUsed
      }
      this.orderService.postOrder(OrderRequest).subscribe();
      this.updateGiftcardPrice();
      Swal.fire("Bestelling geplaatst!", "Je bestelling is geplaatst", "success");
    }
  }

  public addGiftcardToList() {
    this.giftcardService.getGiftcardByCode(this.giftcardCode).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            Swal.fire("Giftcard niet gevonden", "Deze giftcard is niet gevonden", "error");
          }
          // Return an empty observable so the subscribe method doesn't throw an error
          return of(null);
        })
    ).subscribe((giftcard: any) => {
      let listOfGiftcards = JSON.stringify(this.giftcardsUsed);
      let currentGiftcard = JSON.stringify(giftcard);
      let isGiftcardInList = listOfGiftcards.indexOf(currentGiftcard);

      if (isGiftcardInList !== -1) {
        Swal.fire("Giftcard al gebruikt", "Deze giftcard is al gebruikt", "error");
      }
      else if (giftcard.used) {
        Swal.fire("Giftcard niet bruikbaar", "Deze giftcard is niet meer bruikbaar", "error");
      }
      else if (giftcard.price <= 0) {
        Swal.fire("Giftcard niet bruikbaar", "Deze giftcard heeft geen saldo", "error");
      }
      else {
        this.giftcardsUsed.push(giftcard);
        this.calculatePriceFromItems();
      }
      this.calculatePriceFromItems();
    });
  }

  public removeGiftcardFromList(giftcard_index: number) {
      this.giftcardsUsed.splice(giftcard_index, 1);
      this.newGiftcardInfo.splice(giftcard_index, 1);
  }

  public calculatePriceFromItems() {
    let total_price: number = 0;

    for (const product of this.productsInCart) {
      total_price += product.price;
    }

    total_price += this.travelFee;

    this.calculateNewGiftcardValue(total_price, null);
    this.calculatePriceFromGiftcard(total_price);

    return total_price;
  }

  public calculateNewGiftcardValue(total_price: number, giftcard_index: number) {
    this.newGiftcardInfo = [];

    for (const giftcard of this.giftcardsUsed) {
      let newGiftcardValue = giftcard.price - total_price;

      if (newGiftcardValue < 0) {
        newGiftcardValue = 0;
      }

      this.newGiftcardInfo.push({giftcard_index: giftcard_index, giftcard_id: giftcard.giftcard_id, newValue: newGiftcardValue, giftcard_code: giftcard.code});
    }
  }

  public calculatePriceFromGiftcard(total_price: number) {
    for (const giftcard of this.giftcardsUsed) {
      total_price -= giftcard.price;
    }

    return total_price;
  }

  public updateGiftcardPrice() {
    for (const newGiftcard of this.newGiftcardInfo) {
      this.giftcardService.updateSaldoFromOrder(newGiftcard.giftcard_code, newGiftcard.newValue).subscribe();
    }

    this.cartService.removeAllProductsFromCart();
  }
}