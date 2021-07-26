import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ObtproductosService } from '../servicios/obtproductos.service';
import { Producto } from './pizza.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
interface Cart {
  id: string;
}
@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.page.html',
  styleUrls: ['./pizza.page.scss'],
})
export class PizzaPage implements OnInit {
  products: Producto[] = [];
  segment: string = 'pizza';
  cart = [];
  sub:  Subscription;
  constructor(
    private obtproductos: ObtproductosService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    localStorage.setItem('cart', JSON.stringify(''));
    this.obtproductos.productopizza.subscribe((resp) => {
      this.products = resp;
    });
  }

  ionViewWillEnter() {
    this.segment = this.obtproductos.segment;
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

    addToCart(id: any) {
      console.log(id);
      const item = {
      id: id
    }
    this.sub = this.obtproductos.productopizza.subscribe(
      resp => {
        resp.forEach(
          product => {
            if (product.id === id) {
              const localCart = JSON.parse(localStorage.getItem('cart'));
              if (!localCart) {
                this.addToLocalStorage(product);
                return;
              }
              const isIncluded = localCart.some(cart => {
                return cart.id === id;
              });

              isIncluded ? this.duplicatedAlert(product) : this.addToLocalStorage(product);


            }
          }
        )
      }
    )
    this.sub.unsubscribe();

  }

  duplicatedAlert(product: Producto){
    this.alertCtrl.create({
      header: 'Producto ya en carrito',
      message: 'El producto seleccionado ya se encuentra en el carrito, ¿Desea agregar de todas formas al carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Agregar',
          handler: () => {

            this.addToLocalStorage(product)
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    })
  }

  addToLocalStorage(product: Producto) {
    this.cart = [...this.cart, product];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.showToast();
  }

  toCart() {
    this.router.navigate(['cart']);
  }

  showToast() {
    this.toastCtrl.create({
      message: 'Producto agregado al carrito',
      duration: 2000,
      position: 'bottom'
    }).then(
      toastEl => {
        toastEl.present();
      }
    )

  }

}
