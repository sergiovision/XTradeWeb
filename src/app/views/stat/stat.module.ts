import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxChartModule, DxSelectBoxModule, DxLoadPanelModule } from 'devextreme-angular';


// Routing
import { StatRoutingModule } from './stat-routing.module';
import { CapitalComponent } from './capital/capital.component';
import { WalletsService} from '../../services/WalletsService';
import { DealsService} from '../../services/DealsService';
import { SymbolsComponent } from './symbols/symbols.component';

@NgModule({
  imports: [
    StatRoutingModule,
    DxChartModule,
    DxSelectBoxModule,
    DxLoadPanelModule
  ],
  providers: [
    WalletsService,
    DealsService
  ],
  declarations: [
      CapitalComponent,
      SymbolsComponent
  ]
})
export class StatModule { }
