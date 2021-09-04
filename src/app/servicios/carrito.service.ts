import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './../order/order.model';
import { switchMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
    constructor(private http: HttpClient) {}

    onNewOrder(order: Order) {

      return this.http.post<{name: string}>('https://proyectopizza-a1591-default-rtdb.firebaseio.com/orders.json', order).pipe(
        tap(resp => console.log(resp))
      );
    }
}
