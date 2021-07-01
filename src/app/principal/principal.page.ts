import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: string;
  slideOpts = {
    slidesPerView: 2,
    speed: 400,
    autoWidth: true
  };

  constructor() { }

  ngOnInit() {
    const usuarioLocal = JSON.parse(localStorage.getItem('profile'));
    this.usuario = usuarioLocal.name;
  }

}
