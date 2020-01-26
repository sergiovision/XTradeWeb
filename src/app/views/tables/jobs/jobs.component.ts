import { JobsService } from '../../../services/jobs.service';
import { TerminalsService } from '../../../services/terminals.service';
import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { BaseComponent } from '../../../base/base.component';

@Component({
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent extends BaseComponent implements OnInit {
  dataSource: any;
  constructor(public jobs: JobsService) {
    super();
  }
  loadData() {
      this.subs.sink = this.jobs.getAll()
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

   public getDate(regDate: string) {
      const date = new Date(regDate);
      return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: '2-digit'});
   }

   public onClickCell(e) {
     const id: number = e.columnIndex;
     if (id === 5) {
        const data: any = e.data;
        this.subs.sink = this.jobs.runJob(data.Group, data.Name)
        .subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
            console.log(data);
            // notify(data);
            window.location.reload();
          },
          error => {
              const message = JSON.stringify(error);
              console.log(message);
              notify(message);
          });


     }
     if (id === 6) {
      const data: any = e.data;
      this.subs.sink = this.jobs.stopJob(data.Group, data.Name)
        .subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
          console.log(data);
          // notify(data);
          window.location.reload();

        },
        error => {
            const message = JSON.stringify(error);
            console.log(message);
            notify(message);
        });

     }
   }

}
