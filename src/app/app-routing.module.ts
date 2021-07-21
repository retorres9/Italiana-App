import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'bebidas',
    loadChildren: () => import('./bebidas/bebidas.module').then( m => m.BebidasPageModule)
  },
  {
    path: 'postres',
    loadChildren: () => import('./postres/postres.module').then( m => m.PostresPageModule)
  },
  {
    path: 'ensaladas',
    loadChildren: () => import('./ensaladas/ensaladas.module').then( m => m.EnsaladasPageModule)
  },
  {
    path: 'combinacion',
    loadChildren: () => import('./combinacion/combinacion.module').then( m => m.CombinacionPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./screen/detail/detail.module').then( m => m.DetailPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
