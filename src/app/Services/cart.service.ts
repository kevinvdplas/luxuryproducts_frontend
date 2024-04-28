import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

const localStorageKey: string = 'products-in-cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public productsInCart: Product[] = [];
  public $productsInCart: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);

  constructor() {
    this.loadProductsFromLocalStorage();
  }

  public addProductToCart(product: Product) {
    this.productsInCart.push(product);
    this.saveProductAndNotifyChange();
    console.log(this.productsInCart);
  }

  public removeProductFromCart(product_index: number) {
    this.productsInCart.splice(product_index, 1);
    this.saveProductAndNotifyChange();
  }

  public removeAllProductsFromCart() {
    this.productsInCart.splice(0, this.productsInCart.length);
    this.saveProductAndNotifyChange();
  }

  public getAllFromCart(): Product[] {
    return this.productsInCart.slice();
  }

  private saveProductAndNotifyChange(): void {
    this.saveProductsToLocalStorage(this.productsInCart.slice());
    this.$productsInCart.next(this.productsInCart.slice());
  }

  private saveProductsToLocalStorage(products: Product[]): void {
    localStorage.setItem(localStorageKey, JSON.stringify(products));
  }

  private loadProductsFromLocalStorage(): void {
    let productsOrNull = localStorage.getItem(localStorageKey);
    if (productsOrNull != null) {
      // Parse the JSON string to a Product list
      let products: Product[] = JSON.parse(productsOrNull);

      // Assign the products to the productsInCart attribute and notify our subscribers
      this.productsInCart = products;
      this.$productsInCart.next(this.productsInCart.slice());
    }
  }
}
