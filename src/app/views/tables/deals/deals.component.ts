import { DealsService, Deal } from '../../../services/DealsService';
import { Component, OnInit } from '@angular/core';
import query from 'devextreme/data/query';
import notify from 'devextreme/ui/notify';

@Component({
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  dataSource: any;
  popupVisible = false;

  constructor(public deals: DealsService) {
  }

  loadData() {
      this.deals.getAll()
        .subscribe(
            data => {
              // this.dataSource = query(data).filter(['Disabled', '==', '0']).toArray();
              this.dataSource = data;
            },
            error => {
                const message = JSON.stringify( error.error) + '\n' + error.statusText;
                console.log(message);
            });
  }

  ngOnInit() {
    this.loadData();
  }

   /*
   public onClickCell(e) {
     const id: number = e.columnIndex;
     if (id === 5) {
       const account: Account = e.data;
       this.currentState = new AccountState();
       this.currentState.Balance = account.Balance;
       this.currentState.AccountId = account.Id;
       this.popupVisible = true;
       return;
     }
   } */


}
