import { ExpertsService } from '../../services/experts.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables.component';
import { FormsModule } from '@angular/forms';
import { DevExtremeModule,
  DxTextBoxModule,
  DxDateBoxModule,
  DxButtonModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxDataGridModule,
  DxTemplateModule,
  DxPopupModule,
  DxNumberBoxModule,
  DxTextAreaModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxColorBoxModule } from 'devextreme-angular';

// Routing
import { TablesRoutingModule } from './tables-routing.module';
import { TerminalsService } from '../../services/terminals.service';
import { JobsService } from '../../services/jobs.service';
import { TerminalsComponent } from './terminals/terminals.component';
import { JobsComponent } from './jobs/jobs.component';
import { WalletsService} from '../../services/wallets.service';
import { DealsService} from '../../services/deals.service';
import { WalletsComponent } from './wallets/wallets.component';
import { DealsComponent } from './deals/deals.component';
import { ExpertsComponent } from './experts/experts.component';
import { PropsService } from '../../services/props.service';
import { AuthenticationService } from '../../services/authentication.service';
import { PropertiesComponent } from './properties/properties.component';

@NgModule({
  imports: [
    CommonModule,
    DxNumberBoxModule,
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
    DxPopupModule,
    DxTextAreaModule,
    FormsModule,
    DxColorBoxModule
  ],
  declarations: [
    TablesComponent,
    TerminalsComponent,
    JobsComponent,
    WalletsComponent,
    DealsComponent,
    ExpertsComponent,
    PropertiesComponent
  ],
  providers: [
    TerminalsService,
    JobsService,
    WalletsService,
    DealsService,
    ExpertsService,
    PropsService,
    AuthenticationService
  ]

})
export class TablesModule { }
