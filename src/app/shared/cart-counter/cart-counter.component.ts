import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObtproductosService } from '../../servicios/obtproductos.service'

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.scss'],
})
export class CartCounterComponent implements OnInit {
  productsQty: any = 0;
  constructor(private productsService: ObtproductosService,
    private router: Router) { }

  ngOnInit() {
    this.productsService.setCartQty();
    this.productsQty = this.productsService.cartQty;
  }

  toCart() {
    this.router.navigate(['cart']);
  }

}
