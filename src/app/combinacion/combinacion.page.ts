import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-combinacion',
  templateUrl: './combinacion.page.html',
  styleUrls: ['./combinacion.page.scss'],
})
export class CombinacionPage implements OnInit {

  constructor() { }

  slideOpts = {
    initialSlide: 1,
    speed: 100,
    direction: 'vertical',

  };
  ngOnInit() {
  }


}
