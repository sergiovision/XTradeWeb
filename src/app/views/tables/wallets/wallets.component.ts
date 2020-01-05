import { WalletsService } from '../../../services/WalletsService';
import { Component, OnInit } from '@angular/core';
import query from 'devextreme/data/query';
import notify from 'devextreme/ui/notify';
import { AccountState, AccountView } from '../../../models/Entities';


@Component({
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnInit {
  dataSource: any;
  showDisabled: boolean;
  currentState: AccountState;
  popupVisible = false;

  constructor(public wallets: WalletsService) {
    this.showDisabled = true;
    this.currentState = new AccountState();
  }

  loadData() {
      this.wallets.getAll()
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

   public onClickCell(e) {
     const id: number = e.columnIndex;
     if (id === 6) {
       const account: AccountView = e.data;
       this.currentState = new AccountState();
       this.currentState.Balance = account.Balance;
       this.currentState.AccountId = account.Id;
       this.popupVisible = true;
       return;
     }
   }

   public updateAccountState() {
       this.wallets.updateAccountState(this.currentState)
       .subscribe(
        data => {
          this.loadData();
        },
        error => {
            const message = JSON.stringify(error);
            console.log(message);
            notify(message);
        });
       this.popupVisible = false;
   }

}
