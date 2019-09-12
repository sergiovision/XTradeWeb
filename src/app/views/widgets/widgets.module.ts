import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';

@NgModule({
  imports: [
    WidgetsRoutingModule,
    BsDropdownModule
  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule { }
