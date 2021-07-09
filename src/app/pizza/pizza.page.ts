import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ObtproductosService } from '../servicios/obtproductos.service';
import { Producto } from './pizza.model';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.page.html',
  styleUrls: ['./pizza.page.scss'],
})
export class PizzaPage implements OnInit {

products: Producto[]= [];

  constructor(private obtproductos: ObtproductosService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
      this.obtproductos.productopizza.subscribe(
        resp=>{
          this.products = resp;
        }
      )
    }


  ionViewWillEnter(){
    this.loadingCtrl.create({
      message: 'Obteniendo productos',
    }).then(loadingEl => {
      loadingEl.present();
      this.obtproductos.getProducts().subscribe(
        resp=>{
          this.products = resp;
          loadingEl.dismiss();
        }
      )
    })
  }


}

