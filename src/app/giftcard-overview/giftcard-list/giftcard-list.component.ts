import {Component, OnInit} from '@angular/core';
import {ProductComponent} from "../../product-overview/product-list/product/product.component";
import {Product} from "../../models/product.model";
import {ProductService} from "../../Services/product.service";
import {CartService} from "../../Services/cart.service";

@Component({
  selector: 'app-giftcard-list',
  standalone: true,
    imports: [
        ProductComponent
    ],
  templateUrl: './giftcard-list.component.html',
  styleUrl: './giftcard-list.component.scss'
})
export class GiftcardListComponent implements OnInit {
  public productsList: Product[] = new Array<Product>();
  public loadedProducts: Product[] = new Array<Product>();

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.productsList = products;
      this.loadedProducts = this.productsList;
    });
  }

  public addToCart(product: Product): void {
    console.log('added product', product.name, ' to cart');
    this.cartService.addProductToCart(product);
  }
}
