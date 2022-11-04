import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from './coupon.model';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private _coupon = new BehaviorSubject<Coupon[]>([]);

  public get coupons() {
    return this._coupon.asObservable();
  }

  constructor(private http: HttpClient) { }

  getAllCoupons() {
    return this.http.get<{[key: string]: Coupon}>('https://proyectopizza-a1591-default-rtdb.firebaseio.com/coupons.json').pipe(
      map(respData => {
        let coupons = [];
        for (const key in respData) {
          if (respData.hasOwnProperty(key)) {
            coupons.push(new Coupon(
              key,
              respData[key].name,
              respData[key].url,
              respData[key].price,
              respData[key].desc,
              respData[key].validTo,
            ));
          }
        }
        return coupons;
      }),
      tap ((coupons) => {
        return this._coupon.next(coupons);
      })
    );
  }
}
