import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PizzaPageRoutingModule } from './pizza-routing.module';

import { PizzaPage } from './pizza.page';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PizzaPageRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SharedModule
  ],
  declarations: [PizzaPage],
  exports: []
})
export class PizzaPageModule {
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
