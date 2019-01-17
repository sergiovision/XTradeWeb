import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import 'jquery';
// https://github.com/PaulGiletich/ms-signalr-client
import 'ms-signalr-client-jquery-3';
import {
  Router
} from '@angular/router';
import {
  UserToken
} from '../../models/UserToken';
import {
  DealsService,
  PositionInfo
} from '../../services/DealsService';
import CustomStore from 'devextreme/data/custom_store';
import notify from 'devextreme/ui/notify';
import {
  DxDataGridComponent
} from 'devextreme-angular';

declare var $: any;
declare var jQuery: any;
declare var require: any;

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // example is here
  // http://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial
  @ViewChild('positionsContainer') positionsContainer: DxDataGridComponent;
  dataSource: any;
  connectionStarted: boolean;
  popupVisible = false;
  currentUser: UserToken;
  users: UserToken[] = [];
  ds: DealsService;
  // private jQuery = $;

  private connection: any;
  private proxy: any;
  protected store: CustomStore;

  constructor(public deals: DealsService) {
    this.ds = deals;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.connectionStarted = false;
  }

  ngOnInit() {
    this.connection = $.hubConnection(this.ds.baseURL);

    this.proxy = this.connection.createHubProxy('terminalsHub');

    this.proxy.on('UpdatePosition', (data: any) => {
      this.store.push([{
        type: 'update',
        key: data.Ticket,
        data: data
      }]);
    });

    this.proxy.on('RemovePosition', (data: number) => {
      this.store.push([{
        type: 'remove',
        key: data
      }]);
      this.positionsContainer.instance.repaint();
    });

    this.proxy.on('InsertPosition', (data: any) => {
      this.store.push([{
        type: 'insert',
        data: data
      }]);
      this.positionsContainer.instance.repaint();
    });

    this.store = new CustomStore({
      load: () => this.proxy.invoke('getAllPositions'),
      key: 'Ticket'
    });

    // atempt connection, and handle errors
    this.connection.start({
        jsonp: true
      })
      .done(() => {
        // console.log('Connected to terminalsHub: ' + this.connection.id);
        this.dataSource = this.store;
        this.connectionStarted = true;
      })
      .fail(() => {
        notify('Could not connect to Terminals Hub');
      });

  }

  public onClickCell(e) {
    const id: number = e.columnIndex;
    if (id === 6) {
      const pos: PositionInfo = e.data;
      this.ds.closePosition(pos.Magic, pos.Ticket).subscribe(
        data => {
          console.log('Position close request sent ticket=' + pos.Ticket);
        },
        error => {
          const message = JSON.stringify(error.error) + '\n' + error.statusText;
          notify(message);
        });
      return;
    }
  }

  public refreshAll() {
    this.ds.refreshAll().subscribe(
      data => {
        window.location.reload();
      },
      error => {
        const message = JSON.stringify(error.error) + '\n' + error.statusText;
        notify(message);
      });
  }

}
