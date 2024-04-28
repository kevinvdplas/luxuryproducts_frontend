import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../Services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public userIsLoggedIn: boolean = false;
  public productsInCart: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  public ngOnInit(): void {
    this.checkLoginState();
    this.cartService.$productsInCart.subscribe((products: Product[]) => {
      this.productsInCart = products.length;
    });
  }

  public onLogout(): void {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  public checkLoginState(): void {
    this.authService.$userIsLoggedIn.subscribe((loginState: boolean) => {
      this.userIsLoggedIn = loginState;
    });
  }
}
