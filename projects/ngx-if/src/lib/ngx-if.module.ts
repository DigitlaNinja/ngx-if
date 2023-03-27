import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxIfDirective } from './ngx-if.directive';

@NgModule({
  declarations: [NgxIfDirective],
  imports: [CommonModule],
  exports: [NgxIfDirective],
})
export class NgxIfModule {}
