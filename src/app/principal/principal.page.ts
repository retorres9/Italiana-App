import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  slideOpts = {
    slidesPerView: 2,
    speed: 400,
    autoWidth: true
  };

  constructor( public router:Router) { }

  ngOnInit() {
  }
//metodo direccionamiento pagina Pizza
  pPizza(){
    this.router.navigate(['/pizza']);
  }
//metodo direccionamiento pagina Bebidas
  pBebidas(){
    this.router.navigate(['/bebidas']);
  }

}
