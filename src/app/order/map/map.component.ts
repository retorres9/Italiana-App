import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { Subscription } from 'rxjs';
import { ObtproductosService } from '../../servicios/obtproductos.service';
import { Address } from '../../servicios/address.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: Leaflet.map;
  myIcon = Leaflet.icon({
    iconUrl: 'assets/marcador-de-mapa.png',
  });
  road: string;
  neighbourhood: string;
  isLoading: boolean = false;
  sub: Subscription;
  coordinates: any;
  newAddress: Address;
  latLong: any;

  constructor(
    private modalCtrl: ModalController,
    private productService: ObtproductosService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}



  onNewAddress() {
      this.loadingCtrl
        .create({
          message: 'Obteniendo ubicación',
        })
        .then(async (loadingEl) => {
          await loadingEl.present();
          this.sub = this.productService
            .getAddress(this.latLong.lat, this.latLong.lng)
            .subscribe((resp) => {
              this.newAddress = resp;
              console.log(resp);
              this.road = resp.address.road;
              this.neighbourhood = resp.address.neighbourhood;
              this.isLoading = false;
              console.log('reached');
              this.onSaveNewAddress();
              loadingEl.dismiss();
            });
        });
  }

  ionViewDidEnter() {
    this.leafletMap();
  }

  leafletMap() {
    const address = JSON.parse(localStorage.getItem('address'));
    this.map = Leaflet.map('mapView').setView(
      [address.lat, address.lon],
      17
    );
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attibution: 'Pizzería La Italiana',
    }).addTo(this.map);
    let center =this.map.getCenter();
    console.log(center);
    let mark = Leaflet.marker([address.lat, address.lon], {
      icon: this.myIcon,
      draggable: true
    }).addTo(this.map);
    mark.on('dragend', (ev) => {
      console.log(ev.target);
      this.latLong = ev.target._latlng;

      // this.onClickMap(ev.target._latlng.lat, ev.target._latlng.lng);
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onSaveNewAddress() {
    // this.onNewAddress(this.latLong);
    localStorage.setItem('address', JSON.stringify(this.newAddress));
    console.log(this.newAddress);

    this.modalCtrl.dismiss({
      'address': this.newAddress
    });
  }
}
