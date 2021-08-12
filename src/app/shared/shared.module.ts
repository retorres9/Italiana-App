import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './listing/listing.component';
import { WatchComponent } from './watch/watch.component';

@NgModule({
  declarations: [ListingComponent, WatchComponent],
  imports: [CommonModule],
  exports: [ListingComponent, WatchComponent],
})
export class SharedModule {}
