import { Component, OnInit, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ObtproductosService } from '../servicios/obtproductos.service';
import { Producto } from './pizza.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import  firebase from "firebase/app";
import { ToastController } from '@ionic/angular';




@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.page.html',
  styleUrls: ['./pizza.page.scss'],
})
export class PizzaPage implements OnInit {
  products: Producto[] = [];
  segment: string = 'pizza';
  @Input() producto: Producto;

  constructor(
    private obtproductos: ObtproductosService,
    private loadingCtrl: LoadingController,
    private firebaseauth: AngularFireAuth,
    private database: AngularFireDatabase,
    private toastCtrl : ToastController


  ) {}

  ngOnInit() {
    this.obtproductos.productopizza.subscribe((resp) => {
      this.products = resp;

    });
  }

  ionViewWillEnter() {
    console.log(this.segment);
    this.segment = this.obtproductos.segment;
    console.log(this.obtproductos.segment);
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

// crear coleccion carritos y agregar pedidos
  async addCarritoData(datos){
    const user  = await this.firebaseauth.currentUser;
    const userid = user.uid;
    const carritoref = this.database.object('carritos/'+ userid + '/productos' );
    try {
      //await carritoref.push(datos);
      const valorGuardar = { [`${datos.name}`]: firebase.database.ServerValue.increment(1)};
      await carritoref.update(valorGuardar);
      await carritoref.valueChanges().subscribe(resp =>{
        console.log(resp);
      })
      this.presentToast();
    } catch (error) {
    }
  }

  //notificacion de pedido agregado
   async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Se agrego tu pedido al carrito',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }



  async DeleteCarritoData(datos){
    const user  = await this.firebaseauth.currentUser;
    const userid = user.uid;
    const carritoref = this.database.object('carritos/'+ userid + '/productos' );
    try {
      //await carritoref.push(datos);
      const valorGuardar = { [`${datos.name}`]: firebase.database.ServerValue.increment(-1)};
      await carritoref.update(valorGuardar);
      await carritoref.valueChanges().subscribe(resp =>{
        console.log(resp);
      })
    } catch (error) {

    }

  }




}
