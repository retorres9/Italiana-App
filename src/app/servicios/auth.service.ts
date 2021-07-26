import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

import { AngularFireAuth } from "@angular/fire/auth";

import firebase from 'firebase/app';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  public AFauth: AngularFireAuth, private db:AngularFirestore ) { }

//Metodo de logeo con Google
  async login(){
    // GoogleAuth.init();
    const googleUser = await GoogleAuth.signIn();
    console.log(googleUser);
    return googleUser;
  }
//Metodo de logeo con Facebook
  loginFace(){
    return this.AFauth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  }

//Metodo de salida de sesión
  logout() {
    this.AFauth.signOut();
  }

}


