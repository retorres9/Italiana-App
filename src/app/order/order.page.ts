import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LoadingController,
  ModalController,
  AlertController,
} from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { ObtproductosService } from '../servicios/obtproductos.service';
import { MapComponent } from './map/map.component';
import { Subscription } from 'rxjs';
import { Order, States } from './order.model';
import { CarritoService } from '../servicios/carrito.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

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
  sub: Subscription;
  orderReference: string = '';
  // order: Order
  isOrderOk: boolean = false;
  orderSent: boolean = false;

  constructor(
    private loadingCtrl: LoadingController,
    private productService: ObtproductosService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private cartService: CarritoService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ amount }) => {
      this.totalAmount = Number(amount);
    });
  }

  ionViewWillEnter() {
    let addressInfo = JSON.parse(localStorage.getItem('address'));
    addressInfo === null || addressInfo === ''
      ? this.getLocation()
      : this.getPersistentLocation();
  }

  getPersistentLocation() {
    console.log('persistente');

    let addressInfo = JSON.parse(localStorage.getItem('address'));
    console.log(addressInfo);

    this.road = addressInfo.address.road;
    this.neighbourhood = addressInfo.address.neighbourhood;
    this.address = addressInfo;
  }

  getLocation() {
    this.loadingCtrl
      .create({
        message: 'Obteniendo su ubicación',
        backdropDismiss: true,
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.address = Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
        }).then((res) => {
          this.sub = this.productService
            .getAddress(res.coords.latitude, res.coords.longitude)
            .subscribe((resp) => {
              loadingEl.dismiss();
              this.road = resp.address.road;
              this.neighbourhood = resp.address.neighbourhood;
            });
        });
      });
  }

  async onSelectAddress() {
    const modal = await this.modalCtrl.create({
      component: MapComponent,
      backdropDismiss: true,
      swipeToClose: true,
    });
    modal.onDidDismiss().then((data) => {
      const newAddress = data['data'];
      console.log(newAddress.address);
      this.address = newAddress;
      this.neighbourhood = newAddress.address.address.neighbourhood;
      this.road = newAddress.address.address.road;
    });

    return await modal.present();
  }

  addReference() {
    this.alertCtrl
      .create({
        message: 'Ingrese la referencia para la entrega de su pedido',
        inputs: [
          {
            name: 'reference',
            id: 'reference',
            type: 'textarea',
            placeholder: 'Ingrese aquí la referncia',
          },
        ],
        buttons: [
          {
            role: 'cancel',
            text: 'Cancelar',
          },
          {
            text: 'Guardar',
            handler: (userInput) => {
              this.orderReference = userInput.reference;
            },
          },
        ],
      })
      .then((alertElement) => {
        alertElement.present();
      });
  }

  buildOrder() {
    const user = JSON.parse(localStorage.getItem('perfil'));
    const address = JSON.parse(localStorage.getItem('address'));
    const order = new Order();
    order.userId = user.displayName;
    order.latlng = [address.lat, address.lon];
    order.reference = this.orderReference;
    order.date = new Date();
    order.state = States.pending;
    order.cart = JSON.parse(localStorage.getItem('cart'));
    let orderId: string;
    this.loadingCtrl.create({
      message: 'Enviando pedido'
    }).then(loadingElement => {
      loadingElement.present();
      this.cartService.onNewOrder(order).subscribe((resp) => {
        console.log(resp);
        orderId = resp.name;
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization:
              'key=AAAAsejq3kw:APA91bETJC8mm7Ez_epdSO9hCCRJuiCrROMKaKp4cL8XJISOVHnsf5823FZ0AfcWjT4oDAzr49rr_s2DOj5S9_wxEMZdsbhKlsXjIZomsf1g7CapbXzbHP3qtnIrDPuEqJWWHmkpijVY',
          }),
        };
        return this.http
          .post(
            'https://fcm.googleapis.com/fcm/send',
            JSON.stringify({
              to: 'c8IXt7yXQEyLeJrBHx7EGb:APA91bEDCy1QZwcyxcR_T0nr90YBaoB8hUVKY_6VfPHkxKol7xkcpnSI3-MEGP2j13TaOTYQt3oCRgZ-qLxw9V11-VyhchkAFmx_w4VpIsNE-dWfjaC0D95CI2xcUm_PiuidE1ix0dX0',
              notification: {
                body: 'Nuevo Pedido, haga click para ver',
                tittle: 'Italiana App',
              },
              data: {
                orderId: `${orderId}`,
              },
            }),
            httpOptions
          )
          .subscribe(
            resp => {
              this.orderSent = true;
              localStorage.removeItem('cart');
              loadingElement.dismiss();
            }
          );
    })
    });
  }

  async sendOrder() {
    this.orderReference ? this.buildOrder() : await this.showNoRefAlert();
  }

  private showNoRefAlert() {
    this.alertCtrl
      .create({
        header: 'Pedido sin referencia',
        message:
          'Para mejorar la entrega es recomendable ingresar una referencia',
        buttons: [
          {
            role: 'cancel',
            text: 'Cancelar',
          },
          {
            text: 'Continuar',
            handler: () => {
              this.buildOrder();
            },
          },
        ],
      })
      .then(async (alertElement) => {
        await alertElement.present();
      });
  }
}
