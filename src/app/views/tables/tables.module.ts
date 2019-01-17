import { ExpertsService } from './../../services/ExpertsService';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesComponent } from './tables.component';
import { DevExtremeModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxTextBoxModule,
  DxDateBoxModule,
  DxButtonModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxDataGridModule,
  DxTemplateModule,
  DxPopupModule } from 'devextreme-angular';

// Routing
import { TablesRoutingModule } from './tables-routing.module';
import { TerminalsService } from './../../services/TerminalsService';
import { JobsService } from './../../services/JobsService';
import { TerminalsComponent } from './terminals/terminals.component';
import { JobsComponent } from './jobs/jobs.component';
import { WalletsService} from './../../services/WalletsService';
import { DealsService} from './../../services/DealsService';
import { WalletsComponent } from './wallets/wallets.component';
import { DealsComponent } from './deals/deals.component';
import { ExpertsComponent } from './experts/experts.component';

@NgModule({
  imports: [
    DevExtremeModule,
    TablesRoutingModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxButtonModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxDataGridModule,
    DxTemplateModule,
    DxPopupModule
  ],
  declarations: [
    TablesComponent,
    TerminalsComponent,
    JobsComponent,
    WalletsComponent,
    DealsComponent,
    ExpertsComponent
  ],
  providers: [
    TerminalsService,
    JobsService,
    WalletsService,
    DealsService,
    ExpertsService
  ]

})
export class TablesModule { }
