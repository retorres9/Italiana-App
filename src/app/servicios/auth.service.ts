import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

import { AngularFireAuth } from "@angular/fire/auth";

import firebase from 'firebase/app';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  public AFauth: AngularFireAuth, private db:AngularFirestore ) { }

//Metodo de logeo con Google
  login(){
    return this.AFauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };
//Metodo de logeo con Facebook
  loginFace(){
    return this.AFauth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  };

//Metodo de salida de sesión
  logout() {
    this.AFauth.signOut();
  }

}


