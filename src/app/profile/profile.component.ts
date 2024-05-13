import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GiftcardService} from "../Services/giftcard.service";
import {Giftcard} from "../models/giftcard.model";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Product} from "../models/product.model";
import {Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
    public giftcards: Giftcard[] = new Array<Giftcard>();
    public addSaldoForm: FormGroup;

    constructor(private giftcardService: GiftcardService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
      this.giftcardService.getAllGiftcardsByUser().subscribe((giftcards: any) => {
        this.giftcards = giftcards;
        console.log(giftcards)
      });
      this.addSaldoForm = this.formBuilder.group({
        giftcardValue: ['']
      });
    }

    public addSaldoToGiftcard(code: string): void {
        let price = this.addSaldoForm.value.giftcardValue;
        console.log(price);
        this.giftcardService.addSaldoToGiftcard(code, price).subscribe(() => {
            console.log('Saldo updated');
        });
    }
}