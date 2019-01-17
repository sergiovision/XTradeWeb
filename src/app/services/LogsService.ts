import { BaseService } from './BaseService';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LogsService extends BaseService {
  constructor(http: HttpClient) {
      super(http);
  }

}
