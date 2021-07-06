import { Component, OnInit } from '@angular/core';

import { ObtproductosService } from '../servicios/obtproductos.service';
import { Producto } from './pizza.model';


import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.page.html',
  styleUrls: ['./pizza.page.scss'],
})
export class PizzaPage implements OnInit {


products: Producto[]= [];

  constructor( private obtproductos: ObtproductosService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.obtproductos.productopizza.subscribe(
      resp=>{
        this.products = resp;
      }

    )
    this.activatedRoute.params.subscribe(resp => {
      console.log(resp);
      this.titulo = resp.tipo;

    })
  }

  titulo: string;


  ionViewWillEnter(){
   this.obtproductos.getProducts().subscribe();
  }


}
