import { BaseService } from './BaseService';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import notify from 'devextreme/ui/notify';

export class ExpertCluster {
    Id: number;
    Name: string;
    Description: string;
    MetaSymbol: string;
    MasterAdviserId: number;
    Typ: number;
    Retired: boolean;
}

export class Adviser {
    Id: number;
    Name: string;
    TerminalId: string;
    Symbol: string;
    Timeframe: number;
    Lastupdate: Date;
    CloseReason: number;
    State: string;
    Running: boolean;
    Disabled: boolean;
    ClusterId: number;
}

@Injectable()
export class ExpertsService extends BaseService {
    constructor(http: HttpClient) { super(http); }

    public getAll() {
      return super.getAll('/api/experts');
    }

    public getRange(fromDate: string, toDate: string) {
       const url = '/api/experts/GetRange?id=0&fromDate=' + fromDate + '&toDate=' + toDate;
       // notify(url);
       console.log(url);
       return super.getAll(url);
    }

    public updateAdviserState(adv: Adviser) {
      const url = '/api/experts/UpdateAdviserState';
      // notify(url);
      console.log(url);
      return super.putWithParams(url, JSON.stringify(adv));
   }


}
