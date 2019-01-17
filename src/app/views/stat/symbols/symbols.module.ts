import { NgModule, Component } from '@angular/core';
import { DxChartModule, DxSelectBoxModule, DxLoadPanelModule } from 'devextreme-angular';

import { SymbolsComponent } from './symbols.component';
import { WalletsService} from '../../../services/WalletsService';

@NgModule({
  imports: [
    DxChartModule,
    DxSelectBoxModule,
    DxLoadPanelModule
  ],
  providers: [
    WalletsService
  ]
})
export class SymbolsModule { }

