import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';
import { TerminalsComponent } from './terminals/terminals.component';
import { JobsComponent } from './jobs/jobs.component';
import { WalletsComponent } from './wallets/wallets.component';
import { DealsComponent } from './deals/deals.component';
import { ExpertsComponent } from './experts/experts.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tables'
    },
    children: [
      {
        path: 'wallets',
        component: WalletsComponent,
        data: {
          title: 'Wallets'
        }
      },
      {
        path: 'jobs',
        component: JobsComponent,
        data: {
          title: 'Jobs'
        }
      },
      {
        path: 'terminals',
        component: TerminalsComponent,
        data: {
          title: 'Terminals'
        }
      },
      {
        path: 'deals',
        component: DealsComponent,
        data: {
          title: 'Deals'
        }
      },
      {
        path: 'experts',
        component: ExpertsComponent,
        data: {
          title: 'Experts'
        }
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables Info'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule {}
