import { NgModule, Component } from '@angular/core';
import { DxChartModule, DxSelectBoxModule, DxLoadPanelModule } from 'devextreme-angular';
import { PerformanceComponent } from './performance.component';
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
export class PerformanceModule { }

