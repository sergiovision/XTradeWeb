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
  Role: string;
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

export class TodayStat {
    TodayGainReal: number;
    TodayGainDemo: number;
    TodayGainRealPercent: number;
    TodayGainDemoPercent: number;
    TodayBalanceReal: number;
    TodayBalanceDemo: number;
}


@Injectable()
export class DealsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getAll() {
    return super.getAll('/api/deals');
  }

  public getTodayDeals() {
    return super.getAll('/api/deals/GetToday');
  }

  public getTodayStat() {
    return super.getAll('/api/deals/GetTodayStat');
  }

  public getStat(accountType: number) {
    return super.getAll('/api/deals/MetaSymbolStatistics?type=' + accountType);
  }

  public closePosition(account: number, magic: number, ticket: number) {
    const uri: string = '/api/deals/ClosePosition?account=' + account + '&magic=' + magic + '&ticket=' + ticket;
    return super.getAll(uri);
  }

  public refreshAll() {
    return super.getAll('/api/deals/RefreshAll');
  }


}
