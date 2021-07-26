import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  address: any;
  constructor(private router: Router,
              private geo: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.loadingCtrl.create({
      message: 'Obteniendo su ubicación'
    }).then(
      loadingEl => {
        loadingEl.present();
        this.geo.getCurrentPosition().then(resp => {
          console.log(resp);
          this.getAddress(resp.coords.latitude, resp.coords.longitude)
          loadingEl.dismiss();
        });
      }
    )
  }

  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  }

  getAddress(lat, long) {

    this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions).then(
      (resp: NativeGeocoderResult[]) => {
        this.address = this.pretifyAddress(resp  [0]);
      }
    )
  }

  pretifyAddress(address){
    let obj = [];
    let data = "";
    for (let key in address) {
      obj.push(address[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      data += obj[val]+', ';
    }
    console.log(address.areasOfInterest[0]);
    return address.areasOfInterest[0];
  }

}
