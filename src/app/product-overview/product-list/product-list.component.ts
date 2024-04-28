import { Component, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  public productsList: Product[] = new Array<Product>();
  public loadedProducts: Product[] = new Array<Product>();
  public selectedCategory: string;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    console.log(this.productsList);
  }

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

  onSortBy(event: Event) {
    const selectedSortMethod = (event.target as HTMLSelectElement).value;
    if (selectedSortMethod === 'Name ASC') {
      this.loadedProducts = this.loadedProducts.sort(
        (productA: any, productB: any) =>
          productA.name.localeCompare(productB.name)
      );
    } else if (selectedSortMethod === 'Name DESC') {
      this.loadedProducts = this.loadedProducts.sort(
        (productA: any, productB: any) =>
          productB.name.localeCompare(productA.name)
      );
    } else if (selectedSortMethod === 'Price ASC') {
      this.loadedProducts = this.loadedProducts.sort(
        (productA, productB) => productA.price - productB.price
      );
    } else if (selectedSortMethod === 'Price DESC') {
      this.loadedProducts = this.loadedProducts.sort(
        (productA, productB) => productB.price - productA.price
      );
    }
  }

  public filterBy(event: Event) {
    this.selectedCategory = (event.target as HTMLSelectElement).value;

    if (this.selectedCategory === 'All products') {
      this.loadedProducts = this.productsList;
    } else {
      this.loadedProducts = this.productsList.filter(
        (product) => product.category.name == this.selectedCategory
      );
    }
  }
}
