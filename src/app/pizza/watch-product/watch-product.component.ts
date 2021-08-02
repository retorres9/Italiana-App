import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from '../pizza.model';

@Component({
  selector: 'app-watch-product',
  templateUrl: './watch-product.component.html',
  styleUrls: ['./watch-product.component.scss'],
})
export class WatchProductComponent implements OnInit {
  @Input() product: Producto;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.product);
  }

  onDismissModal() {
    this.modalCtrl.dismiss();
  }

}
