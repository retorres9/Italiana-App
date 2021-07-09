import { Component, OnInit } from '@angular/core';
import { ObtproductosService } from '../servicios/obtproductos.service';
import { Producto } from './pizza.model';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.page.html',
  styleUrls: ['./pizza.page.scss'],
})
export class PizzaPage implements OnInit {

products: Producto[]= [];

  constructor( private obtproductos: ObtproductosService) { }

  ngOnInit() {
    // this.obtproductos.productopizza.subscribe(
    //   resp=>{
    //     this.products = resp;
    //   }
    // )
  }

  ionViewWillEnter(){
   this.obtproductos.getProducts().subscribe();
  }


}

