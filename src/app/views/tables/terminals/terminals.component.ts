import { TerminalsService } from '../../../services/terminals.service';
import { Terminal } from '../../../models/Entities';
import { Component, OnInit, ViewChild } from '@angular/core';
import query from 'devextreme/data/query';
import notify from 'devextreme/ui/notify';
import { BaseComponent } from '../../../base/base.component';
import { PropertiesComponent } from '../properties/properties.component';

@Component({
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.scss']
})
export class TerminalsComponent extends BaseComponent implements OnInit {
  dataSource: any;
  showDisabled: boolean;
  showTerminalProperties = false;
  currentTerminal: Terminal;
  @ViewChild(PropertiesComponent) propsContainer: PropertiesComponent;

  constructor(public terminals: TerminalsService) {
    super();
    this.showDisabled = true;
  }

  loadData() {
    this.subs.sink = this.terminals.getAll()
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

  public genDeployScripts() {
    this.subs.sink =  this.terminals.genDeployScripts()
      .subscribe(
        data => {
          const message = 'Deploy finished with Result: ' + data;
          notify(message);
          console.log(message);
        },
        error => {
            const message = JSON.stringify( error.error) + '\n' + error.statusText;
            console.log(message);
        });
  }

  public onClickCell(e) {
    const id: number = e.columnIndex;
    if ( id === 1 ) {
        this.currentTerminal = e.data;
        this.propsContainer.setData(this.currentTerminal.Id, 'Terminal', 6);
        return;
    }
    if ((id === 2) || (id === 3)) {
       const term: Terminal = e.data;
       if (term !== undefined) {
          if ( id === 2) {
            term.Disabled = !term.Disabled;
          }
          if ( id === 3) {
            term.Stopped = !term.Stopped;
          }
          this.subs.sink = this.terminals.updateTerminal(term)
          .subscribe(
           data => {
             this.loadData();
           },
           error => {
               const message = JSON.stringify(error);
               console.log(message);
               notify(message);
           });
       }
       return;
    }
    if (id === 4) {
      const data: any = e.data;
      this.subs.sink = this.terminals.deployTerminal(data.Id);
      return;
    }
 }

  public disableText(e: any): string {
    const data: any = e.data;
    if (data != null) {
       if (data.Disabled === true) {
          return 'Enable';
       } else {
          return 'Disable';
       }
    }
    return 'undefined';
  }

  getCurrentTitle(): string {
    const ret = ' Properties';
    if (this.currentTerminal) {
      return this.currentTerminal.Broker + ': ' + this.currentTerminal.AccountNumber + ret;
    } else     {
        return 'Account' + ret;
    }
  }

/*
  public onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift( {
            location: 'after',
            widget: 'dxButton',
            options: {
                width: 200,
                text: 'Generate Deploy Scripts',
                onClick: this.genDeployScripts()
            }
        });
   }
*/

   public getDate(regDate: string) {
      const date = new Date(regDate);
      return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: '2-digit'});
   }

}
