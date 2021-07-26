import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'principal',
        loadChildren: () =>
          import('../principal/principal.module').then(
            (m) => m.PrincipalPageModule
          ),
      },
      {
        path: 'pizza',
        loadChildren: () =>
          import('../pizza/pizza.module').then((m) => m.PizzaPageModule),
      },
    ],
  },{
    path: '',
    redirectTo: 'tabs/principal',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
