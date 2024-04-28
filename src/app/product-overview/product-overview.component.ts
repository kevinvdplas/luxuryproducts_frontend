import { Component } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss'
})
export class ProductOverviewComponent {

}
