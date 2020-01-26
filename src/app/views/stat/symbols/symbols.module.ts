import { NgModule, Component } from '@angular/core';
import { DxChartModule, DxSelectBoxModule, DxLoadPanelModule } from 'devextreme-angular';

import { SymbolsComponent } from './symbols.component';
import { DealsService} from '../../../services/deals.service';

@NgModule({
  imports: [
    DxChartModule,
    DxSelectBoxModule,
    DxLoadPanelModule
  ],
  providers: [
    DealsService
  ]
})
export class SymbolsModule { }

