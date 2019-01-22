import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapitalComponent } from './capital/capital.component';
import { SymbolsComponent } from './symbols/symbols.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Statistics'
    },
    children: [
      {
        path: 'symbols',
        component: SymbolsComponent,
        data: {
          title: 'Instruments'
        }
      },
      {
        path: 'capital',
        component: CapitalComponent,
        data: {
          title: 'Capital'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatRoutingModule {}
