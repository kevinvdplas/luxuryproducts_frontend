import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../Services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { Order } from '../models/order.model';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  public productsInCart: Product[];

  private order: Order = {
    products: [],
    status: '',
    total_price: 0,
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService
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
    return total_price;
  }

  public removeProductFromCart(product_index: number) {
    this.cartService.removeProductFromCart(product_index);
  }

  public placeOrder() {
    console.log(this.productsInCart);

    this.order.products = this.productsInCart;
    this.order.total_price = this.calcTotalPrice();

    this.orderService.postOrder(this.order).subscribe();
    alert('Thanks for your order!');

    this.cartService.removeAllProductsFromCart();
  }
}
