import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../app/servicios/auth.service";

import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorLogin: any;
  constructor( public auth: AuthService, public router:Router) { }

  ngOnInit() {
    if (localStorage.getItem('perfil')) {
      this.router.navigate(['tabs', 'principal'])
    }
  }

//Metodo que se ejecuta al dar click en boton google
  login(){
    this.auth.login().then(
      resp => {
        console.log(resp);
        let obj = resp;

        localStorage.setItem('perfil', JSON.stringify(obj));
        this.router.navigate(['tabs/principal']);
      }
    ).catch(err => {
      console.log(err);
    });
  }


  loginFace(){
    this.auth.loginFace().then(
      resp => {
        this.router.navigate(['/home']);
      }
    ).catch(
      err => {
        console.error(err);
        this.errorLogin = err;
      }
    );
  }

}
