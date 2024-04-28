import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;

  public isLoggedIn: boolean;

  constructor(private router: Router, private authService: AuthService) {}

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
