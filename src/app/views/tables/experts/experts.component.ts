import { ExpertsService } from '../../../services/experts.service';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import query from 'devextreme/data/query';
import notify from 'devextreme/ui/notify';
import { Adviser, Dictionary, ExpertCluster } from '../../../models/Entities';
import { BaseComponent } from '../../../base/base.component';
import { PropertiesComponent } from '../properties/properties.component';

@Component({
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss']
})
export class ExpertsComponent extends BaseComponent implements OnInit {
  dataSource: any;
  showDisabled: boolean;
  popupVisible = false;
  _showMetaSymProperties = false;
  _currentMetaSymbol: number;
  currentAdviser: Adviser;
  currentCluster: ExpertCluster;
  adviserState: Dictionary<any> = {};
  colCountByScreen: Object;
  @ViewChild(PropertiesComponent, {static: false}) propsContainer: PropertiesComponent;

  constructor(public experts: ExpertsService) {
    super();
    this.showDisabled = true;
    this.colCountByScreen = { md: 4, sm: 2 };
  }

  set showMetaSymProperties(val: boolean) {
    this._showMetaSymProperties = val;
  }

  get showMetaSymProperties(): boolean {
    return this._showMetaSymProperties;
  }


  set currentMetaSymbol(val: number) {
    this._currentMetaSymbol = val;
    this.propsContainer.setData(val);
  }

  get currentMetaSymbol(): number {
    if (this.currentCluster) {
      return this._currentMetaSymbol;
    }
    this._currentMetaSymbol  = 0;
    return 0;
  }

  screen(width) {
    return width < 720 ? 'sm' : 'md';
  }

  loadData() {
      this.subs.sink = this.experts.getAll()
        .subscribe(
            data => {
              this.dataSource = data;
            },
            error => {
                const message = JSON.stringify( error.error) + '\n' + error.statusText;
                console.log(message);
            });
  }

  getCurrentAdviserText(): string {
    const ret = ' Expert Settings';
    if (this.currentAdviser) {
      return this.currentAdviser.Symbol + ret;
    } else     {
        return ret;
    }
  }

  getCurrentTitle(): string {
    const ret = ' Properties';
    if (this.currentCluster) {
      return this.currentCluster.MetaSymbol + ': ' + this.currentCluster.MetaSymbolId.toString() + ret;
    } else     {
        return ret;
    }
  }

  ngOnInit() {
    this.loadData();
  }

   public onClickCell(e) {
     const id: number = e.columnIndex;
     if (id === 6) {
       this.currentAdviser = e.data;
       this.adviserState = JSON.parse(this.currentAdviser.State);
       this.popupVisible = true;
       return;
     }
   }

   public onClickSymbolCell(e) {
    const id: number = e.columnIndex;
    if (id === 3) {
      // this.showMetaSymProperties = true;
      this.currentCluster = e.data;
      this.currentMetaSymbol = this.currentCluster.MetaSymbolId;
      // console.log('Current data: ');
      // console.log(this.currentCluster);
      return;
    }
  }

   public updateAdviser() {
       const strData: string = JSON.stringify(this.adviserState);
       this.currentAdviser.State = strData;
       this.subs.sink = this.experts.updateAdviserState(this.currentAdviser)
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
