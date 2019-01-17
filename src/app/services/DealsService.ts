import {
  BaseService
} from './BaseService';
import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import notify from 'devextreme/ui/notify';

export class Deal {
  Id: number;
  AccountId: number;
  PersonId: number;
  SiteId: number;
  Name: string;
  ShortName: string;
  Retired: boolean;
  Balance: number;
  OpenTime: Date;
  CloseTime: Date;
  Comment: string;
}

export class PositionInfo {
  Account: number;
  AccountName: string;
  Type: number;
  Magic: number;
  Ticket: number;
  Lots: number;
  Symbol: string;
  MetaSymbol: string;
  ProfitStopsPercent: number;
  ProfitBricks: number;
  Profit: number;
}

export class MetaSymbolStat {
  MetaId: number;
  Name: string;
  Description: string;
  NumOfTrades: number;
  TotalProfit: number;
  ProfitPerTrade: number;
  Date: Date;
}


@Injectable()
export class DealsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getAll() {
    return super.getAll('/api/deals');
  }

  public getStat() {
    return super.getAll('/api/deals/MetaSymbolStatistics');
  }

  public closePosition(magic: number, ticket: number) {
    const uri: string = '/api/deals/ClosePosition?magic=' + magic + '&ticket=' + ticket;
    // console.log(uri);
    return super.getAll(uri);
  }

  public refreshAll() {
    return super.getAll('/api/deals/RefreshAll');
  }


}
