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
  products: Producto[] = [];
  segment: string = 'pizza';

  constructor(
    private obtproductos: ObtproductosService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.obtproductos.productopizza.subscribe((resp) => {
      this.products = resp;
    });
  }

  ionViewWillEnter() {
    console.log(this.segment);
    this.segment = this.obtproductos.segment;
    console.log(this.obtproductos.segment);
    this.loadingCtrl
      .create({
        message: 'Obteniendo productos',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.obtproductos.getProducts().subscribe((resp) => {
          this.products = resp;
          loadingEl.dismiss();
        });
      });
  }

  segmentChanged(e) {
    this.obtproductos.setSegment(e.detail.value)
    this.segment = this.obtproductos.segment;
  }
}
