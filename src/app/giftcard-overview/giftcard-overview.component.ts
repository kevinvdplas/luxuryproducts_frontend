import { Component } from '@angular/core';
import {ProductListComponent} from "../product-overview/product-list/product-list.component";
import {GiftcardListComponent} from "./giftcard-list/giftcard-list.component";

@Component({
  selector: 'app-giftcard-overview',
  standalone: true,
  imports: [
    ProductListComponent,
    GiftcardListComponent
  ],
  templateUrl: './giftcard-overview.component.html',
  styleUrl: './giftcard-overview.component.scss'
})
export class GiftcardOverviewComponent {

}
