import {Component, OnInit} from '@angular/core';
import {GiftcardService} from "../Services/giftcard.service";
import {Giftcard} from "../models/giftcard.model";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
    public giftcards: Giftcard[] = new Array<Giftcard>();

    constructor(private giftcardService: GiftcardService, private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
      this.giftcardService.getAllGiftcardsByUser().subscribe((giftcards: any) => {
        this.giftcards = giftcards;
      });
    }
}