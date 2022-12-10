import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../pizza/pizza.model';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { WatchComponent } from '../watch/watch.component';
import { ObtproductosService } from '../../servicios/obtproductos.service'

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  @Input() products: Producto[];
  cart = [];
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private productsController: ObtproductosService
  ) { }

  ngOnInit() {
    // console.log(this.products);
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
    this.productsController.setCartQty();
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
