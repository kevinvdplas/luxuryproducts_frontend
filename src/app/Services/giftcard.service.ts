import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Giftcard} from "../models/giftcard.model";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class GiftcardService {

  constructor(private http: HttpClient, private authService: AuthService) { }

    public getAllGiftcards(): Observable<any> {
        return this.http.get<Giftcard[]>(environment.base_url + '/giftcards');
    }

    public getAllGiftcardsByUser(): Observable<any> {
        let email = this.authService.getEmail();
        return this.http.get<Giftcard[]>(environment.base_url + '/giftcards/' + email);
    }

    public deactivateGiftcard(giftcard_id: number): Observable<any> {
        return this.http.put(environment.base_url + '/giftcards/deactivate/' + giftcard_id, {});
    }

    public activateGiftcard(giftcard_id: number): Observable<any> {
        return this.http.put(environment.base_url + '/giftcards/activate/' + giftcard_id, {});
    }

    public getGiftcardByCode(code: string): Observable<any> {
        return this.http.get<Giftcard>(environment.base_url + '/giftcards/code/' + code);
    }

    public updateSaldo(code: string, saldo: number): Observable<any> {
        return this.http.put(environment.base_url + '/giftcards/updateSaldo/' + code, {saldo});
    }

    public addSaldoToGiftcard(code: string, price: number): Observable<any> {
        return this.http.put(environment.base_url + '/giftcards/updateSaldo/' + code, {price});
    }
}
