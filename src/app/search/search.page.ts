import { Component, OnInit } from '@angular/core';
import { Producto } from '../pizza/pizza.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  products: Producto[] = [];
  constructor(private router: Router) {}

  searchProduct(searchCriteria) {
    if (searchCriteria.value === '') {
      return;
    }
    let localProducts = JSON.parse(localStorage.getItem('products'));
    this.products = [];

    localProducts.forEach(product => {

      product.name.toLowerCase().includes(searchCriteria.value.toLowerCase()) ? this.products.push(product) : false;
    });
  }

  toCart() {
    this.router.navigate(['cart']);
  }
}
