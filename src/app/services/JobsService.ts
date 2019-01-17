import { BaseService } from './BaseService';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class JobParam {
  Group: string;
  Name: string;
}

@Injectable()
export class JobsService extends BaseService {
    constructor(http: HttpClient) { super(http); }

    public getAll() {
      return super.getAll('/api/jobs');
    }

    public getRunning() {
      return super.getAll('/api/jobs/GetRunning');
    }

    public runJob(group: string, name: string) {
      const body: JobParam = new JobParam();
      body.Group = group;
      body.Name = name;
      return super.postWithParams('/api/jobs/Post', JSON.stringify(body));
    }

    public stopJob(group: string, name: string) {
      const body: JobParam = new JobParam();
      body.Group = group;
      body.Name = name;
      return super.postWithParams('/api/jobs/Stop', JSON.stringify(body));
    }

}
