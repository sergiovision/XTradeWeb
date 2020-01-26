import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import notify from 'devextreme/ui/notify';
import { Terminal } from '../models/Entities';

@Injectable()
export class TerminalsService extends BaseService {
    constructor(http: HttpClient) { super(http); }

    public getAll() {
      return super.getAll('/api/experts/GetTerminals');
    }

    public genDeployScripts() {
      return super.getAll('/api/experts/GenerateDeployScripts');
    }

    public deployTerminal(id: number) {
      return super.getAll('/api/experts/DeployScript/' + id)
      .subscribe(
        data => {
          console.log(data);
          notify(data);
        },
        error => {
            const message = JSON.stringify(error);
            console.log(message);
            notify(message);
        });
    }

    public updateTerminal(terminal: Terminal) {
      return super.putWithParams('/api/experts/Put', JSON.stringify(terminal));

    }
}
