import {Component, OnInit} from '@angular/core';
import {ProfileComponent} from "../profile/profile.component";
import {NgForOf, NgIf} from "@angular/common";
import {Giftcard} from "../models/giftcard.model";
import {GiftcardService} from "../Services/giftcard.service";
import {AuthService} from "../auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent extends ProfileComponent implements OnInit {
  public giftcards: Giftcard[] = new Array<Giftcard>();
  public addSaldoForm: FormGroup;

  constructor(protected giftcardService: GiftcardService, private authService: AuthService, private router: Router) {
    super(giftcardService, new FormBuilder);
    this.addSaldoForm = this.formBuilder.group({
      giftcardValue: ['']
    });
  }

  ngOnInit(): void {
    this.giftcardService.getAllGiftcards().subscribe((giftcards: any) => {
      this.giftcards = giftcards;
      console.log(giftcards);
    });
    this.isAdmin()
  }

  public deactivateGiftcard(giftcard_id: number): void {
    this.giftcardService.deactivateGiftcard(giftcard_id).subscribe(() => {
      console.log('Giftcard deactivated');
    });
    location.reload();
  }

  public activateGiftcard(giftcard_id: number): void {
    this.giftcardService.activateGiftcard(giftcard_id).subscribe(() => {
      console.log('Giftcard activated');
    });
    location.reload();
  }

  public isAdmin(): void {
    this.authService.checkIfUserIsAdmin().subscribe(admin => {
      if (!admin) {
        this.router.navigate(['/']);
      }
    });
  }

  public addSaldoToGiftcard(code: string) {
    super.addSaldoToGiftcard(code);
  }
}