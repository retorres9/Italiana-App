import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../app/servicios/auth.service";

import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( public auth: AuthService, public router:Router) { }

  ngOnInit() {
  }

//Metodo que se ejecuta al dar click en boton google
  login(){
    this.auth.login().then(
      resp => {
        console.log(resp);

        localStorage.setItem('perfil', JSON.stringify(resp.additionalUserInfo.profile));
        localStorage.setItem('credencial', JSON.stringify(resp.credential));
        this.router.navigate(['/principal']);
      }
    ).catch(err => {
      console.log(err);
    });
  }


  loginFace(){
    this.auth.loginFace().then(
      resp => {
        console.log(resp);

        localStorage.setItem('perfil', JSON.stringify(resp.additionalUserInfo.profile));
        localStorage.setItem('credencial', JSON.stringify(resp.credential));
        this.router.navigate(['/principal']);
      }
    ).catch(err => {
      console.log(err);
    });
  }


}
