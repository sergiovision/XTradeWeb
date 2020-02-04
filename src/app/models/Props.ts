export enum EntitiesEnum {
    Undefined = 0,
    Account = 1,
    Settings = 2,
    Adviser = 3,
    MetaSymbol = 4,
    Symbol = 5,
    Terminal = 6,
    Deals = 7,
    Jobs = 8,
    Country = 9,
    Currency = 10,
    ExpertCluster = 11,
    NewsEvent = 12,
    Person = 13,
    Rates = 14,
    Site = 15,
    Wallet = 16
}

export interface DynamicProperty<T> {
    type: string;
    // name: string;
    // group: string;
    value: T;
}

export interface DynamicProperties
{
    ID: number;
    objId: number;
    entityType: EntitiesEnum;
    Vals: string;
    updated: Date;
}


export class DynamicPropertyDefinition<T> {
    type: string;
    name: string;
    group: string;
    control: string;
    defaultValue: T;
    minValue?: T;
    maxValue?: T;
    description: string;

    constructor(x: new () => T) {
        this.type = x.name;
        // this.defaultValue = defaultValue;
    }
}


