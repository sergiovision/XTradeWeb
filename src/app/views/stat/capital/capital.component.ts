import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WalletsService } from '../../../services/WalletsService';
import { DxChartComponent } from 'devextreme-angular';
import { Wallet, SelectYear } from '../../../models/Entities';

@Component({
  templateUrl: 'capital.component.html',
  styleUrls: ['capital.component.scss']
})

export class CapitalComponent implements OnInit, AfterViewInit  {

  @ViewChild('walletChart', {static: false}) walletChart: DxChartComponent;

  dataSource: Wallet[];

  fromDate: Date;
  toDate: Date;
  currentYearIndex: number;
  loadingVisible: boolean;

  public years: Array<SelectYear>;


  public getYears()  {
    let arr = new Array<SelectYear>();
    var d = new Date(Date.now());
    var cY = d.getFullYear();
    let i = 0;
    for (let index = cY; index >= 2015; index--) {
      const yearX:number = index;
      arr.push( {
        id: i,
        name: yearX.toString(),
        valueFrom: new Date(yearX, 0, 2),
        valueTo: (i===0)?d:new Date(yearX, 11, 31)
      });  
      i++;     
    }
    return arr;    
  }

  constructor(public wallets: WalletsService) {
    this.currentYearIndex = 0;
    this.years = this.getYears();
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

  ngAfterViewInit() {
    // this.walletChart.argumentAxis.label.format = "month";
    // this.walletChart.argumentAxis.label.visible = false;

  }

  customizeTooltip(arg) {
    const price: number = arg.value;
    const d: Date = arg.originalArgument;
    return {
      text: price.toFixed(2) + '$ / ' + d.toDateString()
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
