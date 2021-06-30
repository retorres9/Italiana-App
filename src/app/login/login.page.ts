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
  login(proveedor: string){
    console.log(proveedor);

    this.auth.login(proveedor);
    this.router.navigate(['/home']);
  }

  loginFace(proveedor:string){
    this.auth.loginFace(proveedor);
    this.router.navigate(['/home']);
  }

}
