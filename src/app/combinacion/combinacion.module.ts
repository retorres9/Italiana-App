import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CombinacionPageRoutingModule } from './combinacion-routing.module';

import { CombinacionPage } from './combinacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CombinacionPageRoutingModule
  ],
  declarations: [CombinacionPage]
})
export class CombinacionPageModule {}
