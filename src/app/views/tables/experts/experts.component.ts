import { ExpertsService } from '../../../services/ExpertsService';
import { Component, OnInit } from '@angular/core';
import query from 'devextreme/data/query';
import notify from 'devextreme/ui/notify';
import { ExpertCluster, Adviser, Dictionary } from '../../../models/Entities';


@Component({
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss']
})
export class ExpertsComponent implements OnInit {
  dataSource: any;
  showDisabled: boolean;
  popupVisible = false;
  currentAdviser: Adviser;
  adviserState: Dictionary<any> = {};
  colCountByScreen: Object;

  constructor(public experts: ExpertsService) {
    this.showDisabled = true;
    this.colCountByScreen = { md: 4, sm: 2 };
  }

  screen(width) {
    return width < 720 ? 'sm' : 'md';
  }

  loadData() {
      this.experts.getAll()
        .subscribe(
            data => {
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
       this.currentAdviser = e.data;
       this.adviserState = JSON.parse(this.currentAdviser.State);
       this.popupVisible = true;
       return;
     }
   }

   public updateAdviser() {
       const strData: string = JSON.stringify(this.adviserState);
       this.currentAdviser.State = strData;
       this.experts.updateAdviserState(this.currentAdviser)
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
