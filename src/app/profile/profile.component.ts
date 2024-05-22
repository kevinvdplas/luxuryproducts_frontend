import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GiftcardService} from "../Services/giftcard.service";
import {Giftcard} from "../models/giftcard.model";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import Swal from "sweetalert2";

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
export class ProfileComponent implements OnInit{
    public giftcards: Giftcard[] = new Array<Giftcard>();
    public addSaldoForm: FormGroup;

    constructor(protected giftcardService: GiftcardService, protected formBuilder: FormBuilder) {}

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

        if (price > 0) {
            Swal.fire({
                title: 'Weet je het zeker?',
                text: 'Wil je echt ' + price + ' euro aan saldo toevoegen aan deze giftcard?',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: 'Ja',
                cancelButtonText: 'Nee',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Saldo toegevoegd!", "Het saldo is toegevoegd aan de giftcard", "success");
                    this.giftcardService.addSaldoToGiftcard(code, price).subscribe(() => {
                        console.log('Saldo updated');
                    });
                } else if (result.isDismissed) {
                    Swal.fire("Saldo niet toegevoegd", "Het saldo is niet toegevoegd aan de giftcard", "error");
                }
            });
        } else {
            Swal.fire("Saldo niet toegevoegd", "Het saldo moet groter zijn dan 0", "error");
        }
    }

    public sortTableByGiftcardId(): void {
        this.giftcards.sort((a, b) => a.giftcard_id - b.giftcard_id);
    }

    public sortTableByUserId(): void {
        this.giftcards.sort((a, b) => a.userId - b.userId);
    }
}