import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DealsService} from './../../services/DealsService';
import { JobsService} from './../../services/JobsService';
import {
      DevExtremeModule,
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

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    // ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DevExtremeModule,
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
  providers: [
    DealsService,
    JobsService
  ],

  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
