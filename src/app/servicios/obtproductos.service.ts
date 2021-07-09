import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../pizza/pizza.model';
import { HttpClient } from '@angular/common/http';
import { tap,map } from "rxjs/operators";




@Injectable({
  providedIn: 'root'
})
export class ObtproductosService {
  private _product = new BehaviorSubject<Producto[]>([]);
  private _segment: string = 'pizza';
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

  getProducts(){
    const product = new Producto();
    return this.http.get<Producto[]>('https://proyectopizza-a1591-default-rtdb.firebaseio.com/pizzas.json').pipe(
      map(pizza =>{
        const products = [];
        for(const key in pizza){
          if(pizza.hasOwnProperty(key)){
            product.name = pizza[key].name;
            product.description = pizza[key].description;
            product.prices = pizza[key].prices;
            product.image = pizza[key].image;
          }
          products.push({...product});
        }
        return products;
      }),
      tap((products)=>{
        return this._product.next(products)
      })
    )
  }

}

