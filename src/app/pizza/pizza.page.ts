import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ObtproductosService } from '../servicios/obtproductos.service';
import { Producto } from './pizza.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WatchComponent } from '../shared/watch/watch.component';
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
  segment: string = 'pizzas';
  cart = [];
  // sub:  Subscription;
  constructor(
    private obtproductos: ObtproductosService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.fetchProducts(this.segment);
  }

  segmentChanged(e) {
    this.obtproductos.setSegment(e.detail.value);
    this.segment = this.obtproductos.segment;
    this.fetchProducts(this.segment);
  }

  addToCart(id: any) {
    let sub = JSON.parse(localStorage.getItem('cart'));
    sub === null ? localStorage.setItem('cart', JSON.stringify('')) : false;
    sub = JSON.parse(localStorage.getItem('cart'));
    // return;
    let products = JSON.parse(localStorage.getItem('products'));
    let productIdx = products.findIndex((product) => product.id === id);
    if (sub.length === 0) {
      this.addToLocalStorage(products[productIdx]);
    } else {
      const isIncluded = sub.some((prod) => {
        return prod.id === id ? true : false;
      });
      isIncluded
        ? this.duplicatedAlert(products[productIdx])
        : this.addToLocalStorage(products[productIdx]);
    }
    this.obtproductos.setCartQty();
    this.obtproductos.cartQty;

  }

  fetchProducts(segment: string) {
    this.segment = this.obtproductos.segment;
    this.loadingCtrl
      .create({
        message: 'Obteniendo productos',
      })
      .then((loadingEl) => {
        let productLocal = JSON.parse(localStorage.getItem('products'));

        if (productLocal === null) {
          loadingEl.present();
          this.obtproductos.getProducts(this.segment).subscribe((resp) => {
            productLocal = resp;
            loadingEl.dismiss();
          });
        }
        productLocal = JSON.parse(localStorage.getItem('products'));
        this.products = productLocal.filter(product => {
          return product.type === segment;
        });
      });
  }

  duplicatedAlert(product: Producto) {
    this.alertCtrl
      .create({
        header: 'Producto ya en carrito',
        message:
          'El producto seleccionado ya se encuentra en el carrito, ¿Desea agregar de todas formas al carrito?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Agregar',
            handler: () => {
              this.addToLocalStorage(product);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  addToLocalStorage(product: Producto) {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    this.cart = localCart;
    this.cart = [...this.cart, product];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.showToast();
    this.obtproductos.setCartQty();
  }

  toCart() {
    this.router.navigate(['cart']);
  }

  showToast() {
    this.toastCtrl
      .create({
        message: 'Producto agregado al carrito',
        duration: 1500,
        position: 'top',
        translucent: true,
      })
      .then((toastEl) => {
        toastEl.present();
      });
  }

  watchProduct(id: string) {
    const productIdx = this.products.findIndex((prod) => prod.id === id);
    this.modalCtrl
      .create({
        component: WatchComponent,
        backdropDismiss: true,
        mode: 'ios',
        swipeToClose: true,
        componentProps: {
          product: this.products[productIdx],
        },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }
}
