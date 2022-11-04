import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObtproductosService } from '../servicios/obtproductos.service';
import { CouponService } from '../servicios/coupon.service';
import { Coupon } from '../servicios/coupon.model';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  coupons: Coupon[];
  usuario: string;
  slideOpts = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    // speed: 400,
    //autoWidth: true
  };

  constructor(
    public router: Router,
    private productService: ObtproductosService,
    private couponService: CouponService
  ) {}

  ngOnInit() {
    const usuarioLocal = JSON.parse(localStorage.getItem('perfil'));
    usuarioLocal.displayName
      ? (this.usuario = usuarioLocal.displayName)
      : (this.usuario = usuarioLocal.name);
    this.couponService.getAllCoupons().subscribe();
    this.couponService.coupons.subscribe(
      resp => {
        this.coupons = resp;
      }
    )

  }

  //metodo direccionamiento pagina Pizza
  pPizza(tipo: string) {
    this.productService.setSegment(tipo);
    this.router.navigate([`tabs/pizza`]);
  }
}
