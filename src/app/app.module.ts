import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { firebaseConfig } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, AngularFirestore, } from "@angular/fire/firestore";
import { HttpClientModule } from "@angular/common/http";
import {  AngularFireDatabaseModule } from "@angular/fire/database";





@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(firebaseConfig),
            AngularFireAuthModule,AngularFirestoreModule,HttpClientModule,AngularFireDatabaseModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,}

             ],
  bootstrap: [AppComponent],
})
export class AppModule {}
