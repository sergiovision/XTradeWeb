import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import notify from 'devextreme/ui/notify';
import { AccountState } from '../models/Entities';

@Injectable()
export class WalletsService extends BaseService {
    constructor(http: HttpClient) { super(http); }

    public testFunc() : number { return 5; }

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
       // console.log(url);
       return super.getAll(url);
    }

    public getPerformance(month: number, period: number) {
      const url = '/api/wallets/Performance?month=' + month + '&period=' + period;
      return super.getAll(url);
    }

}
