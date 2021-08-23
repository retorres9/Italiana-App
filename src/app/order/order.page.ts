import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { ObtproductosService } from '../servicios/obtproductos.service';
import { MapComponent } from './map/map.component';
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
  orderReference: string;

  constructor(private router: Router,
              private loadingCtrl: LoadingController,
              private productService: ObtproductosService,
              private activatedRoute: ActivatedRoute,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({amount}) => {

        this.totalAmount = Number(amount);
    });

  }


  ionViewWillEnter() {
      localStorage.setItem('address', JSON.stringify(''));
      this.loadingCtrl.create({
      message: 'Obteniendo su ubicación',
      backdropDismiss: true
    }).then(
      loadingEl => {
        loadingEl.present();
          this.address = Geolocation.getCurrentPosition(
            {enableHighAccuracy: true}
          ).then(
            res => {
              console.log(res);
              const address = JSON.parse(localStorage.getItem('address'));
              // }
              if (address.length > 0 ) {
                loadingEl.dismiss();
                return;
              }
              this.sub = this.productService.getAddress(res.coords.latitude, res.coords.longitude).subscribe(
                resp => {
                  loadingEl.dismiss();
                  this.road = resp.address.road;
                  this.neighbourhood = resp.address.neighbourhood;
                }
              );
            }
          );
      }
    )
  }

  async onSelectAddress() {
    const modal = await this.modalCtrl.create({
      component: MapComponent,
      backdropDismiss: true,
      swipeToClose: true
    });
    modal.onDidDismiss()
      .then((data) => {
        const newAddress = data['data'];
        console.log(newAddress.address);
        this.address = newAddress;
        this.neighbourhood = newAddress.address.address.neighbourhood;
        this.road = newAddress.address.address.road;
    });

    return await modal.present();
  }

  addReference() {
    this.alertCtrl.create({
      message: 'Ingrese la referencia para la entrega de su pedido',
      inputs: [
        {
          name: 'reference',
          id: 'reference',
          type: 'textarea',
          placeholder: 'Ingrese aquí la referncia'
        }
      ],
      buttons: [
        {
          role: 'cancel',
          text: 'Cancelar'
        },
        {
          text: 'Guardar',
          handler: (userInput) => {
            this.orderReference = userInput.reference;
          }
        }
      ]
    }).then( alertElement => {
      alertElement.present();
    })
  }
}
