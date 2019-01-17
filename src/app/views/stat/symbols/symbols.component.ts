import { Component, OnInit } from '@angular/core';
import { DealsService, MetaSymbolStat } from '../../../services/DealsService';
import notify from 'devextreme/ui/notify';

@Component({
  templateUrl: 'symbols.component.html',
  styleUrls: ['symbols.component.scss']
})
export class SymbolsComponent implements OnInit  {
  dataSource: MetaSymbolStat;

  loadingVisible: boolean;

  constructor(public deals: DealsService) {
    this.loadingVisible = true;
  }

  loadData() {
    this.loadingVisible = true;

    this.deals.getStat()
      .subscribe(
          data => {
            this.dataSource = data;
            this.loadingVisible = false;
          },
          error => {
              const message = JSON.stringify( error.error) + '\n' + error.statusText;
              console.log(message);
          });
  }

  ngOnInit() {
    this.loadData();
  }

  customizeTooltip(arg) {
    return {
      text: arg.valueText + '$ / ' + arg.argumentText
    };
  }

}
