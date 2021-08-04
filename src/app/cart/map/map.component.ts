import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { Subscription } from 'rxjs';
import { ObtproductosService } from '../../servicios/obtproductos.service';

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
  constructor(
    private modalCtrl: ModalController,
    private productService: ObtproductosService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onClickMap() {
    this.isLoading = true;
    this.map.on('click', (ev) => {
      let popup = Leaflet.popup()
        .setLatLng(ev.latlng)
        .setContent('Nueva ubicación')
        .openOn(this.map);
        this.coordinates = ev.latlng;
      });
      this.loadingCtrl
        .create({
          message: 'Obteniendo ubicación',
        })
        .then((loadingEl) => {
          loadingEl.present();
          this.sub = this.productService
            .getAddress(this.coordinates.lat, this.coordinates.lng)
            .subscribe((resp) => {
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
    this.map = Leaflet.map('mapView').setView(
      [-4.3247032999999995, -79.5529663],
      18
    );
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attibution: 'Pizzería La Italiana',
    }).addTo(this.map);
    Leaflet.marker([-4.3247032999999995, -79.5529663], {
      icon: this.myIcon,
    }).addTo(this.map);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onNewAddress() {
    this.modalCtrl.dismiss();
  }
}
