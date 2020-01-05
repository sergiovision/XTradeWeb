import { DealsService } from '../../../services/DealsService';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  dataSource: any;
  popupVisible = false;

  constructor(public deals: DealsService) {
  }

  loadData() {
      this.deals.getAll()
        .subscribe(
            data => {
              // this.dataSource = query(data).filter(['Disabled', '==', '0']).toArray();
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

}
