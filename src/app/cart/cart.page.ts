import { Component, OnInit } from '@angular/core';
import { Producto } from '../pizza/pizza.model';
import { ObtproductosService } from '../servicios/obtproductos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart = [];
  totalAmount: number = 0;
  products: Producto[];
  totalAux = 0.00;
  constructor(private productService: ObtproductosService,
              private router: Router,
              private alertCtrl: AlertController) {}

  ngOnInit() {
    // let perfil = JSON.parse(localStorage.getItem('perfil'));
    this.cart = JSON.parse(localStorage.getItem('cart'));
    console.log(this.cart);

    if (this.cart === null) {

      localStorage.setItem('cart', JSON.stringify(''));
    }
    if (this.cart.length === 0) {
      return;
    }
    this.cart.forEach((product, id) => {
      product.quantity = 1;
      product.totalAmount = 0;
      if (product.prices.length === 1) {
        product.selectedType = product.prices[0].price;
      }
      this.calculatePrice(id);
    });
    this.calculateTotalAmount()
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  onTypeSelect(e, id: string, index: number) {
    this.cart[index].selectedType = e.detail.value;
    this.calculatePrice(index);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  calculatePrice(id: number) {
    this.cart[id].totalAmount =
      this.cart[id].selectedType * this.cart[id].quantity;
    this.calculateTotalAmount();
  }

  lessQuantity(id: string, index: number) {
    if (this.cart[index].quantity > 1) {
      --this.cart[index].quantity;
    }
    this.calculatePrice(index);
  }

  addQuantity(id: string, index: number) {
    let cartIdx = this.cart.findIndex((cart) => cart.id === id);
    ++this.cart[index].quantity;
    this.calculatePrice(index);
  }

  removeFromCart(index: number) {
    let cart= JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {

    this.totalAmount = this.cart.reduce(
      (total, product) => total + product.totalAmount,
      0
    );
    (Number.isNaN(this.totalAmount) ? (this.totalAmount = this.totalAux) : (this.totalAux = this.totalAmount));
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  proccess() {
    this.totalAmount > 0 ? this.router.navigate(['order', `${this.totalAmount}`]) : this.showAlert();

  }

  showAlert() {
    this.alertCtrl.create({
      header: 'No se puede procesar el carrito',
      message: 'Existen productos en el carrito a los que no se ha asignado un tamaño, selecciona los tamaños de las pizzas para coninuar',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    })
  }
}
