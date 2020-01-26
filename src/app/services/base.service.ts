import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UserToken } from '../models/Entities';
import { DatePipe } from '@angular/common';

@Injectable()
export class BaseService {
  public baseURL: string;
  public formatDate: string;
  public datePipe: DatePipe;

  constructor(protected http: HttpClient) {
    this.datePipe = new DatePipe('en-US');
    this.baseURL = environment.baseURL;
    this.formatDate = environment.dateFormat;
  }

  transformDate(date): string {
    return this.datePipe.transform(date, this.formatDate);
  }

  transformShortDate(date): string {
    return this.datePipe.transform(date, environment.shortDateFormat);
  }

  // transformMTDate(date): Date {
  //   return this.datePipe.transform(date, 'yyyy.MM.dd HH:mm');
  // }

  public get currentUserToken(): UserToken {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public get authHeaders(): HttpHeaders {
    const user: UserToken = this.currentUserToken;
    return new HttpHeaders()
    .append('Accept', 'application/json; charset=utf-8')
    .append('Content-Type', 'application/json; charset=utf-8')
    .append('Authorization', 'Bearer ' + user.access_token);
  }

  public getAll(apiAction: string) {
    return this.http.get<any>(this.baseURL + apiAction, { headers: this.authHeaders });
  }

  public postWithParams(apiAction: string, body: string) {
    return this.http.post<string>(this.baseURL + apiAction, body, { headers: this.authHeaders });
  }

  public putWithParams(apiAction: string, body: string) {
    return this.http.put<string>(this.baseURL + apiAction, body, { headers: this.authHeaders });
  }

}
