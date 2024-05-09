import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Giftcard} from "../models/giftcard.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GiftcardService {

  constructor(private http: HttpClient) { }

    public getAllGiftcards(): Observable<any> {
        return this.http.get<Giftcard[]>(environment.base_url + '/giftcards');
    }

    public deactivateGiftcard(giftcard_id: number): Observable<any> {
        return this.http.put(environment.base_url + '/giftcards/deactivate/' + giftcard_id, {});
    }

    public activateGiftcard(giftcard_id: number): Observable<any> {
        return this.http.put(environment.base_url + '/giftcards/activate/' + giftcard_id, {});
    }
}
