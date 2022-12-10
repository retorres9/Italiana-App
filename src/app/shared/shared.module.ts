import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './listing/listing.component';
import { WatchComponent } from './watch/watch.component';
import { CartCounterComponent } from './cart-counter/cart-counter.component'

@NgModule({
  declarations: [ListingComponent, WatchComponent, CartCounterComponent],
  imports: [CommonModule],
  exports: [ListingComponent, WatchComponent, CartCounterComponent],
})
export class SharedModule { }
