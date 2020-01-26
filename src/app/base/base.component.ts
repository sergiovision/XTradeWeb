import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-base',
  template: `NO UI TO BE FOUND HERE!`,
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit, OnDestroy {
  protected subs: SubSink = new SubSink();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
