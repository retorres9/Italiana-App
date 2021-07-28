import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { ObtproductosService } from '../servicios/obtproductos.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  address: any;

  constructor(private router: Router,
              private loadingCtrl: LoadingController,
              private productService: ObtproductosService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadingCtrl.create({
      message: 'Obteniendo su ubicación'
    }).then(
      loadingEl => {
        loadingEl.present();

          console.log('askdjaskjdaksjd');
          this.address = Geolocation.getCurrentPosition(
            {enableHighAccuracy: true}
          ).then(
            res => {
              console.log(res);
              this.productService.getAddress(res.coords.latitude, res.coords.longitude).subscribe(
                resp => {
                  loadingEl.dismiss();
                  this.address = resp.display_name;
                }
              );
            }
          );
      }
    )
  }

}
