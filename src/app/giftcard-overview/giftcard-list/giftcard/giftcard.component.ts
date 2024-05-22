import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {Product} from "../../../models/product.model";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-giftcard',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './giftcard.component.html',
  styleUrl: './giftcard.component.scss'
})
export class GiftcardComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;

  public isLoggedIn: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.$userIsLoggedIn.subscribe(
        (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }

  @Output() public addToCart: EventEmitter<Product> =
      new EventEmitter<Product>();

  public onBuyProduct(): void {
    this.addToCart.emit(this.product);
    alert('succesfully added: ' + this.product.name + ' to cart!');
  }
}