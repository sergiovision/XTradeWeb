import { Component, OnInit } from '@angular/core';
import { DealsService, MetaSymbolStat } from '../../../services/DealsService';
import notify from 'devextreme/ui/notify';

export class SelectAccountType {
  id: number;
  name: string;
  value: number;
}

@Component({
  templateUrl: 'symbols.component.html',
  styleUrls: ['symbols.component.scss']
})
export class SymbolsComponent implements OnInit  {
  dataSource: MetaSymbolStat;
  currentAccountType: number;
  loadingVisible: boolean;

  public AccountType: SelectAccountType[] = [{
    id: 0,
    name: 'Real',
    value: 0
    }, {
    id: 1,
    name: 'Demo',
    value: 1,
    }];


  constructor(public deals: DealsService) {
    this.loadingVisible = true;
    this.currentAccountType = 0;
  }

  loadData() {
    this.loadingVisible = true;

    this.deals.getStat(this.currentAccountType)
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

  onValueChanged(data) {
    this.currentAccountType = data.value;
    this.loadData();
  }


}
