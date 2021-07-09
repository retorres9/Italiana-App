import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: string;
  slideOpts = {
    slidesPerView: 1.5,
    centeredSlides:true,
    loop:true,
    spaceBetween:10,
   // speed: 400,
    //autoWidth: true
  };

  constructor(public router:Router) { }


  ngOnInit() {
    const usuarioLocal = JSON.parse(localStorage.getItem('perfil'));
    this.usuario = usuarioLocal.name;
  }

  //metodo direccionamiento pagina Pizza
  pPizza(tipo: string){
    this.router.navigate([`tabs/pizza`]);
  }
//metodo direccionamiento pagina Bebidas
  pBebidas(){
    this.router.navigate(['/bebidas']);
  }
  //metodo direccionamiento pagina Postres
  pPostres(){
    this.router.navigate(['/postres']);
  }
  //metodo direccionamiento pagina ensaladas
  pEnsaladas(){
    this.router.navigate(['/ensaladas']);
  }
  bPizza(){
    this.router.navigate(['/combinacion']);
  }



}
