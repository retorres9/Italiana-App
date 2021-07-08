import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PizzaPageRoutingModule } from './pizza-routing.module';
import { Component } from '@angular/core';

import { PizzaPage } from './pizza.page';

@Component({
  selector: 'pizza-module',
  templateUrl: 'pizza.page.html',
  styleUrls: ['pizza.page.scss'],
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PizzaPageRoutingModule,

  ],
  declarations: [PizzaPage]
})
export class PizzaPageModule {
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
