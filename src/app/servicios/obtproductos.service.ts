import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../pizza/pizza.model';
import { HttpClient } from '@angular/common/http';
import { tap,map } from "rxjs/operators";
import { Address } from './address.model';

@Injectable({
  providedIn: 'root'
})
export class ObtproductosService {
  private _product = new BehaviorSubject<Producto[]>([]);
  private _segment: string = 'pizzas';
  public get segment(): string {
    return this._segment;
  }

  public get productopizza (){
    return this._product.asObservable();
  }


  constructor( private http: HttpClient ) { }

  setSegment(tipo: string) {
    this._segment = tipo;
  }

  getProducts(segment: string){
    const product = new Producto();
    return this.http.get<Producto[]>(`https://proyectopizza-a1591-default-rtdb.firebaseio.com/products.json`).pipe(
      map(pizza =>{
        const products = [];
        for(const key in pizza){
          if(pizza.hasOwnProperty(key)){
            product.id = key;
            product.name = pizza[key].name;
            product.description = pizza[key].description;
            product.prices = pizza[key].prices;
            product.image = pizza[key].image;
            product.type = pizza[key].type;
          }
          products.push({...product});
        }
        localStorage.setItem('products', JSON.stringify(products));
        return products;
      }),
      tap((products)=>{
        return this._product.next(products)
      })
    )
  }

  getAddress(lat: number, lon: number) {
    return this.http.get<Address>(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`).pipe(
      map(resp => {
        localStorage.setItem('address', JSON.stringify(resp));
        return resp;
      })
    );
  }

}

