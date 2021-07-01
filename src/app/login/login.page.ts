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
        localStorage.setItem('perfil', JSON.stringify(resp.additionalUserInfo.profile));
        localStorage.setItem('credencial', JSON.stringify(resp.credential));
        this.router.navigate(['/principal']);
      }
    ).catch(err => {
      console.log(err);
    });
  }

  // !! Revisar porqué el método loginFace recive un proveedor y de donde lo obtiene porque en login no se usa el proveedor
  loginFace(

  ){
    // this.auth.loginFace(proveedor).then(
    //   resp => {
    //     this.router.navigate(['/home']);
    //   }
    // ).catch(
    //   err => {
    //     console.error(err);
    //   }
    // );
  }

}
