import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';

import 'brace/index';
import 'brace/theme/eclipse';
import 'brace/theme/monokai';
import 'brace/mode/markdown';
import 'brace/mode/javascript';
import 'brace/ext/language_tools.js';
import { LogsService } from '../../services/LogsService';
import 'jquery';
import 'ms-signalr-client-jquery-3';
import notify from 'devextreme/ui/notify';
declare var $: any;
declare var jQuery: any;
declare var require: any;

@Component({
  templateUrl: 'logs.component.html'
})
export class LogsComponent implements AfterViewInit, OnInit {
  @ViewChild('editor') editor;

  // text: string = defaults.markdown;
  options: any = {
    // maxLines: 1000,
    printMargin: false,
    wrap: true,
    showGutter: false
  };

  private connection: any;
  private proxy: any;
  public text: string;
  public logS: LogsService;
  constructor( public logz: LogsService) {
      this.logS = logz;
  }

  ngOnInit() {
    this.connection = $.hubConnection(this.logS.baseURL);

    this.proxy = this.connection.createHubProxy('logsHub');

    this.proxy.on('WriteLog', (message: string) => {
      this.text += message;
      // this.editor.execCommand('gotoend');
    });
    this.proxy.on('WritesScopeLog', (scope: string, message: string) => {
      this.text += '***' + message + '***';
      // this.editor.execCommand('gotoend');

    });
    this.connection.start({ jsonp: true })
    .done(() => {
      // console.log('Connected to LogsHub: ' + this.connection.id);
      this.proxy.invoke('getAllText').pipe((t) => {
        this.text = t;
        // this.editor.execCommand('gotoend');
      });
    })
    .fail(() => { notify('Could not connect to Terminals Hub'); });
  }


  public getText(): string {
    return this.text;
  }

  public ClearLogs() {
    this.proxy.invoke('clearLog');
    // this.route.navigate(['/logs']);

    console.log('Clear logs');
    // this.ngOnInit();
    window.location.reload();

  }

  public RefreshLogs() {
    // this.ngOnInit();
    window.location.reload();

  }

  ngAfterViewInit () {
    this.editor.setMode('markdown');
    this.editor.setTheme('eclipse');
    this.editor.setReadOnly(true);
  }


/*  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    this.logS.saveText();
    event.returnValue = false;
    event.preventDefault();
    return undefined;
  }
  onModeChange (e) {
    const mode = e.target.value;
    this.text = defaults[mode];
    this.editor.setMode(mode);
  } */
}
