import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
