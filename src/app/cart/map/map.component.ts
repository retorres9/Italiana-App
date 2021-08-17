import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  constructor(
    private modalCtrl: ModalController,
    private productService: ObtproductosService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}



  onClickMap(lat, lng) {
    // this.isLoading = true;
    // this.map.on('click', (ev) => {
    //   let mark = Leaflet.marker([ev.latlng.lat, ev.latlng.lng])
    //     .setLatLng(ev.latlng)
    //     .setContent('Nueva ubicación')
    //     .openOn(this.map);
    //     this.coordinates = ev.latlng;
    //   });
    // this.map
      this.loadingCtrl
        .create({
          message: 'Obteniendo ubicación',
        })
        .then((loadingEl) => {
          loadingEl.present();
          this.sub = this.productService
            .getAddress(lat, lng)
            .subscribe((resp) => {
              this.newAddress = resp;
              console.log(resp);
              this.road = resp.address.road;
              this.neighbourhood = resp.address.neighbourhood;
              this.isLoading = false;
              loadingEl.dismiss();
              // this.sub.unsubscribe();
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
      18
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
      this.onClickMap(ev.target._latlng.lat, ev.target._latlng.lng);
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onSaveNewAddress() {
    localStorage.setItem('address', JSON.stringify(this.newAddress));

    this.modalCtrl.dismiss();
  }
}
