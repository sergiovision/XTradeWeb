import { Component, OnInit } from '@angular/core';
import { WalletsService, Wallet } from '../../../services/WalletsService';
import notify from 'devextreme/ui/notify';

export class SelectYear {
  id: number;
  name: string;
  valueFrom: Date;
  valueTo: Date;
}

@Component({
  templateUrl: 'capital.component.html',
  styleUrls: ['capital.component.scss']
})

export class CapitalComponent implements OnInit  {
  dataSource: Wallet[];

  fromDate: Date;
  toDate: Date;
  currentYearIndex: number;
  loadingVisible: boolean;

  public years: SelectYear[] = [{
    id: 0,
    name: '2015',
    valueFrom: new Date(2015, 1, 2),
    valueTo: new Date(2015, 11, 31),
}, {
    id: 1,
    name: '2016',
    valueFrom: new Date(2016, 0, 2),
    valueTo: new Date(2016, 11, 31),
}, {
    id: 2,
    name: '2017',
    valueFrom: new Date(2017, 2, 12),
    valueTo: new Date(2017, 11, 31),
}, {
    id: 3,
    name: '2018',
    valueFrom: new Date(2018, 0, 2),
    valueTo: new Date(Date.now()),
} ];

  constructor(public wallets: WalletsService) {
    this.currentYearIndex = 3;
    this.fromDate = this.years[this.currentYearIndex].valueFrom;
    this.toDate = this.years[this.currentYearIndex].valueTo;
    this.loadingVisible = true;
  }

  loadData() {
    this.loadingVisible = true;

    this.wallets.getRange(this.wallets.transformDate(this.fromDate), this.wallets.transformDate(this.toDate))
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

  public customizeTitle() {
    return 'Capital ' + this.years[this.currentYearIndex].name;
  }

  onValueChanged(data) {
    this.currentYearIndex = data.value;
    this.fromDate = this.years[this.currentYearIndex].valueFrom;
    this.toDate = this.years[this.currentYearIndex].valueTo;
    this.loadData();
  }

}
