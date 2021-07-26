import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PizzaPageRoutingModule } from './pizza-routing.module';
import { Component } from '@angular/core';

import { PizzaPage } from './pizza.page';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PizzaPageRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  declarations: [PizzaPage]
})
export class PizzaPageModule {
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
