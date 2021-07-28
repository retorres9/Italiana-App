import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ObtproductosService } from '../servicios/obtproductos.service';

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

  constructor(public router: Router, private productService: ObtproductosService) { }


  ngOnInit() {
    const usuarioLocal = JSON.parse(localStorage.getItem('perfil'));
    usuarioLocal.displayName ? (this.usuario = usuarioLocal.displayName) : (this.usuario = usuarioLocal.name);
  }

  //metodo direccionamiento pagina Pizza
  pPizza(tipo: string){
    this.productService.setSegment(tipo);
    this.router.navigate([`tabs/pizza`]);
  }
}
