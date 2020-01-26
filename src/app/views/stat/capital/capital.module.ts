import { NgModule, Component } from '@angular/core';
import { DxChartModule, DxSelectBoxModule, DxLoadPanelModule } from 'devextreme-angular';

import { CapitalComponent } from './capital.component';
import { WalletsService} from '../../../services/wallets.service';

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
export class CapitalModule { }
