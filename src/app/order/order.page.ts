import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { ObtproductosService } from '../servicios/obtproductos.service';
import { MapComponent } from '../cart/map/map.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  address: any;
  neighbourhood: string;
  road: string;
  totalAmount: number;
  sub: Subscription

  constructor(private router: Router,
              private loadingCtrl: LoadingController,
              private productService: ObtproductosService,
              private activatedRoute: ActivatedRoute,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({amount}) => {
      console.log(amount);

        this.totalAmount = Number(amount);
    });
    console.log(this.totalAmount);

  }

  ionViewWillEnter() {
    this.loadingCtrl.create({
      message: 'Obteniendo su ubicación'
    }).then(
      loadingEl => {
        loadingEl.present();
          this.address = Geolocation.getCurrentPosition(
            {enableHighAccuracy: true}
          ).then(
            res => {
              console.log(res);
              this.sub = this.productService.getAddress(res.coords.latitude, res.coords.longitude).subscribe(
                resp => {
                  loadingEl.dismiss();
                  console.log(resp);
                  this.road = resp.address.road;
                  this.neighbourhood = resp.address.neighbourhood;
                }
              );
            }
          );
      }
    )
  }

  onSelectAddress() {
    this.modalCtrl.create({
      component: MapComponent,
      backdropDismiss: true,
      swipeToClose: true
    }).then(
      modalEl => {
        modalEl.present();
      }
    )
  }

}
