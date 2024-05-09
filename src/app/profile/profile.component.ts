import {Component, OnInit} from '@angular/core';
import {GiftcardService} from "../Services/giftcard.service";
import {Giftcard} from "../models/giftcard.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
    public giftcards: Giftcard[] = new Array<Giftcard>();

    constructor(private giftcardService: GiftcardService) {}

    ngOnInit(): void {
      this.giftcardService.getAllGiftcards().subscribe((giftcards: any) => {
          console.log(giftcards)
        this.giftcards = giftcards;
      });
    }

    public deactivateGiftcard(giftcard_id: number): void {
        this.giftcardService.deactivateGiftcard(giftcard_id).subscribe(() => {
            console.log('Giftcard deactivated');
        });
    }
}
