export class UserToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    userName: string;
}


export interface Dictionary<T> {
    [Key: string]: T;
}

  
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

export class Terminal {
    Id: number;
    AccountNumber: number;
    Broker: string;
    FullPath: string;
    CodeBase: string;
    Disabled: boolean;
    Demo: boolean;
    Stopped: boolean;
}


export class NewsCalendarEvent {
    text: string;
    startDate: Date;
    endDate: Date;
    currency: string;
  }
  
  export class NewsEventInfo {
    Currency: string;
    Name: string;
    Importance: number;
    RaiseDateTime: string;
  }
  
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
      RISK_PER_DAY: number;
      DAILY_MIN_GAIN: number;
      DAILY_LOSS_AFTER_GAIN: number;
      Deals: Deal[];
      Accounts: Account[];
  }
  
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

enum AccountType {
  Checking,
  Investment
}


export class AccountView {
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
  Typ: AccountType;
}

export class Account {
    Id: number;
    Description: string;
    Balance: number;
    Equity: number;
    CurrencyId: number;
    CurrencyStr: string;
    WalletId: number;
    TerminalId: number;
    PersonId: number;
    Number: number;
    Lastupdate: Date;
    Retired: boolean;
    Typ: number;
    DailyProfit: number;
    DailyMaxGain: number;
    StopTrading: boolean;
    StopReason: string;
}


export class TimeStat {
  Date: Date;
  X: number;
  Period: number;
  CheckingValue: number;
  InvestingValue: number;
  CheckingChange: number;
  InvestingChange: number;
}

export class SelectYear {
  id: number;
  name: string;
  valueFrom: Date;
  valueTo: Date;
}

export class SelectMonth {
    id: number;
    name: string;
    value: number;
}


  