import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ObtproductosService } from '../servicios/obtproductos.service';
import { Producto } from './pizza.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WatchProductComponent } from './watch-product/watch-product.component';
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

  ) {}

  ngOnInit() {
    this.obtproductos.productopizza.subscribe((resp) => {
      this.products = resp;

    });
  }

  ionViewWillEnter() {
    this.fetchProducts()
    }

    segmentChanged(e) {
      this.obtproductos.setSegment(e.detail.value)
      this.segment = this.obtproductos.segment;
      this.fetchProducts();
    }

    addToCart(id: any) {
    let sub = JSON.parse(localStorage.getItem('cart'));
    let product = JSON.parse(localStorage.getItem(`${this.segment}`));
    console.log(product);

    let productIdx = product.findIndex(prod => prod.id === id);
    console.log(productIdx);

    const isIncluded = sub.some(prod => {

      return prod.id === id ? true:false;
        // const localCart = JSON.parse(localStorage.getItem('cart'));
      //   if (!sub) {
      //     this.addToLocalStorage(prod);

      //   }
      //   const isIncluded = sub.some(cart => {
      //     console.log(cart.id === id);

      //     return cart.id === id;
      //   });
      //   console.log(isIncluded);

      // }
    });
    isIncluded ? this.duplicatedAlert(product[productIdx]) : this.addToLocalStorage(product[productIdx]);
    console.log(isIncluded);

  }

  fetchProducts() {
    this.segment = this.obtproductos.segment;
    this.loadingCtrl
    .create({
        message: 'Obteniendo productos',
      })
      .then((loadingEl) => {
        this.products = JSON.parse(localStorage.getItem(`${this.segment}`))
        if (this.products) {
          return;
        }
        loadingEl.present();
        this.obtproductos.getProducts(this.segment).subscribe((resp) => {
          this.products = resp;
          loadingEl.dismiss();
        });
      });
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
    console.log([...this.cart]);
    let localCart = [...this.cart];
    console.log(localCart);
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
      duration: 1500,
      position: 'top',
      translucent: true,
    }).then(
      toastEl => {
        toastEl.present();
      }
    )
  }

  watchProduct(id: string) {
    const productIdx = this.products.findIndex(prod => prod.id === id);
    this.modalCtrl.create({
      component: WatchProductComponent,
      backdropDismiss: true,
      mode: 'ios',
      swipeToClose: true,
      componentProps: {
        'product': this.products[productIdx]
      }
    }).then (
      modalEl => {
        modalEl.present();
      }
    )
  }



}
