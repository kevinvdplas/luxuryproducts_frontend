import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Giftcard} from "../models/giftcard.model";
import {GiftcardService} from "../Services/giftcard.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  public giftcards: Giftcard[] = new Array<Giftcard>();

  constructor(private giftcardService: GiftcardService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.giftcardService.getAllGiftcards().subscribe((giftcards: any) => {
      // console.log(giftcards)
      this.giftcards = giftcards;
    });
    this.isAdmin()
  }

  public deactivateGiftcard(giftcard_id: number): void {
    this.giftcardService.deactivateGiftcard(giftcard_id).subscribe(() => {
      console.log('Giftcard deactivated');
    });
  }

  public activateGiftcard(giftcard_id: number): void {
    this.giftcardService.activateGiftcard(giftcard_id).subscribe(() => {
      console.log('Giftcard activated');
    });
  }

  public isAdmin(): void {
    this.authService.checkIfUserIsAdmin().subscribe(admin => {
      if (!admin) {
        this.router.navigate(['/']);
      }
    });
  }
}