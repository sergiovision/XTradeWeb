import { ExpertsService } from '../../../services/experts.service';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import query from 'devextreme/data/query';
import notify from 'devextreme/ui/notify';
import { Adviser, ExpertCluster } from '../../../models/Entities';
import { BaseComponent } from '../../../base/base.component';
import { PropertiesComponent } from '../properties/properties.component';
import { EntitiesEnum } from '../../../models/Props';

@Component({
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss']
})
export class ExpertsComponent extends BaseComponent implements OnInit {
  dataSource: any;
  showDisabled: boolean;
  popupVisible = false;
  _showProperties = false;
  currentMetaSymbol: number;
  currentAdviser: Adviser;
  currentCluster: ExpertCluster;
  // adviserState: Dictionary<any> = {};
  colCountByScreen: Object;
  currentEntityName: string;
  currentEntityType: number;
  @ViewChild(PropertiesComponent, {static: false}) propsContainer: PropertiesComponent;

  constructor(public experts: ExpertsService) {
    super();
    this.showDisabled = true;
    this.colCountByScreen = { md: 4, sm: 2 };
  }

  set showProperties(val: boolean) {
    this._showProperties = val;
     // if (!val && (this.currentEntityType === EntitiesEnum.Adviser)) {
     // this.updateAdviser();
     // }
  }

  get showProperties(): boolean {
    return this._showProperties;
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
     if (id === 3) {
        this.currentAdviser = e.data;
        this.propsContainer.setData(this.currentAdviser.Id, 'Adviser', 3);
        return;
     }
     // if (id === 6) {
     //  this.currentAdviser = e.data;
     //  this.adviserState = JSON.parse(this.currentAdviser.State);
     //  this.popupVisible = true;
     //  return;
     // }
   }

   public onClickSymbolCell(e) {
    const id: number = e.columnIndex;
    if (id === 3) {
      // this.showMetaSymProperties = true;
      this.currentCluster = e.data;
      // console.log('Current data: ');
      // console.log(this.currentCluster.MetaSymbolId);

      this.currentMetaSymbol = this.currentCluster.MetaSymbolId;
      this.propsContainer.setData(this.currentMetaSymbol, 'MetaSymbol', 4);
      return;
    }
  }

   public updateAdviser() {
       if (this.currentAdviser === undefined || this.currentAdviser == null) {
         return;
       }

       // const strData: string = JSON.stringify(this.adviserState);
       // this.currentAdviser.State = strData;
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
