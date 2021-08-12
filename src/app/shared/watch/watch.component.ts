import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from '../../pizza/pizza.model';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
})
export class WatchComponent implements OnInit {
  @Input() products: Producto;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onDismissModal() {
    this.modalCtrl.dismiss();
  }
}
