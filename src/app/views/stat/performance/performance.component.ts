import { Component, OnInit } from '@angular/core';
import { WalletsService, TimeStat } from '../../../services/WalletsService';
import notify from 'devextreme/ui/notify';
import { validateConfig } from '@angular/router/src/config';

export class SelectMonth {
  id: number;
  name: string;
  value: number;
}

let currMonth = 0;

@Component({
  templateUrl: 'performance.component.html',
  styleUrls: ['performance.component.scss']
})
export class PerformanceComponent implements OnInit  {
  dataSource: TimeStat[];
  loadingVisible: boolean;
  currentMonth: number;

  public Months: SelectMonth[] = [{
    id: 0,
    name: 'January',
    value: 0
    },
    {
    id: 1,
    name: 'February',
    value: 1
    },
    {
      id: 2,
      name: 'March',
      value: 2
    },
    {
      id: 3,
      name: 'April',
      value: 3
    },
    {
      id: 4,
      name: 'May',
      value: 4
    },
    {
      id: 5,
      name: 'June',
      value: 5
    },
    {
      id: 6,
      name: 'July',
      value: 6
    },
    {
      id: 7,
      name: 'August',
      value: 7
    },
    {
      id: 8,
      name: 'September',
      value: 8
    },
    {
      id: 9,
      name: 'October',
      value: 9
    },
    {
      id: 10,
      name: 'November',
      value: 10
    },
    {
      id: 11,
      name: 'December',
      value: 11
    }
    ];


  constructor(public wallet: WalletsService) {
    this.loadingVisible = true;
    const now: Date = new Date();
    this.currentMonth = now.getMonth();
  }

  loadData() {
    this.loadingVisible = true;
    this.wallet.getPerformance(this.currentMonth, 0) // 0 means daily
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
    const now: Date = new Date();
    this.currentMonth = now.getMonth();
    this.loadData();
  }

  customizeTooltip(arg) {
    const now = new Date();
    let year: number = now.getFullYear();
    if (now.getMonth() < currMonth) {
        year = year - 1;
    }
    const dateVal: string = new Date(year, currMonth,  arg.argument).toLocaleString('en-us', {  weekday: 'long' });
    const resultString: string = arg.valueText + '$/' + arg.argument + 'th ' + dateVal;
    return {
      text: resultString
    };
  }

  onValueChanged(data) {
    this.currentMonth = data.value;
    currMonth = this.currentMonth;
    this.loadData();
  }

  customizePoint(arg) {
    if (arg.value === 0) {
      return {
        visible: false
      };
    }
    if (arg.series.pane === 'topPane') {
      if (arg.data.InvestingChange > 0) {
        return { color: '#00cc00', hoverStyle: { color: '#00cc00' } };
      }
    }
    if (arg.series.pane === 'bottomPane') {
      if (arg.data.CheckingChange > 0) {
        return { color: '#00cc00', hoverStyle: { color: '#00cc00' } };
      }
    }
  }

  customizeLabel(arg) {
    if (arg.value === 0) {
      return {
        visible: false
      };
    }
    if (arg.series.pane === 'topPane') {
      let value = 0;
      if (arg.data.InvestingValue > 0) {
          value = (arg.data.InvestingChange / arg.data.InvestingValue) * 100;
      }
      if (arg.data.InvestingChange > 0) {
          return {
              visible: true,
              customizeText: function (e: any) {
                return e.valueText + '\n' + value.toFixed(2) + '%';
              },
              backgroundColor: '#00cc00'
          };
      } else  {
        return {
          visible: true,
          customizeText: function (e: any) {
            return e.valueText + '\n' + value.toFixed(2) + '%';
          }
      };

      }

    }
    if (arg.series.pane === 'bottomPane') {
      if (arg.data.CheckingChange > 0) {
          return {
              visible: true,
              backgroundColor: '#00cc00'
          };
      }
    }
  }
}

