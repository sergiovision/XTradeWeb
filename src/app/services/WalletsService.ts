import { BaseService } from './BaseService';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import notify from 'devextreme/ui/notify';

export class Wallet {
    Id: number;
    PersonId: number;
    SiteId: number;
    Name: string;
    ShortName: string;
    Retired: boolean;
    Balance: number;
    Date: Date;
}

export class AccountState {
    Id: number;
    AccountId: number;
    Date: Date;
    Balance: number;
    Comment: string;
    Formula: string;
}

export class Account {
  Id: number;
  Description: string;
  Retired: boolean;
  Balance: number;
  Equity: number;
  TerminalId: number;
  PersonId: number;
  WalletId: number;
  CurrencyId: number;
  CurrencyStr: string;
  Number: number;
  Lastupdate: Date;
}

@Injectable()
export class WalletsService extends BaseService {
    constructor(http: HttpClient) { super(http); }

    public getAll() {
      return super.getAll('/api/wallets');
    }

    public deployTerminal(id: number) {
      return super.getAll('/api/wallets/' + id)
      .subscribe(
        data => {
          console.log(data);
          notify(data);
        },
        error => {
            const message = JSON.stringify(error);
            console.log(message);
            notify(message);
        });
    }


    public updateAccountState(accState: AccountState) {
       return super.putWithParams('/api/wallets/Put', JSON.stringify(accState));
    }

    public getRange(fromDate: string, toDate: string) {
       const url = '/api/wallets/GetRange?id=0&fromDate=' + fromDate + '&toDate=' + toDate;
       // notify(url);
       console.log(url);
       return super.getAll(url);
    }

}
