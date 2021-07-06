import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CombinacionPage } from './combinacion.page';

const routes: Routes = [
  {
    path: '',
    component: CombinacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CombinacionPageRoutingModule {}
