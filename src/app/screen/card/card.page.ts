import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

interface Cart{
  name: string,
  price: number

}

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  constructor(    private firebaseauth: AngularFireAuth,
                  private database: AngularFireDatabase,
                  private toastCtrl : ToastController) { }

    carrito: any;

  async ngOnInit() {


    this.firebaseauth.user.pipe(
      map(user =>user.uid),
      map(uid => this.database.object('carritos/'+ uid + '/productos' )),
      switchMap(carritoref => carritoref.valueChanges())
    ).subscribe(resp =>{
      this.carrito = resp;
      console.log(resp);
    })


  }




}
