import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { PropsService } from '../../../services/props.service';
import { EntitiesEnum, DynamicProperties, DynamicProperty } from '../../../models/Props';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() entityName: string;
  @Input() entityType: EntitiesEnum;
  @Input() parentVisible = false;
  @Output() parentVisibleChange = new EventEmitter<boolean>();

  public objId: number;
  public defs: {[key: string]: any };
  public responseData: DynamicProperties;
  public dataSource: Map<string, DynamicProperty<any> >;

  constructor(public props: PropsService) {
    super();
    // tslint:disable-next-line: max-line-length
    // this.dataSource = JSON.parse('{"ID":{"type":"integer","name":"ID","group":"System","value":3},"ObjectID":{"type":"integer","name":"ObjectID","group":"System","value":"3"}}');

  }

  ngOnInit() {
    super.ngOnInit();
  }

  get UpdatedProperty(): Date {
     let result = new Date(2100, 1, 1);
     if (this.responseData) {
        result = this.responseData.updated;
     }
     return result;
  }

  set UpdatedProperty(val: Date) {
  }

  setData(val: number): void {
    this.objId = val;
    this.subs.unsubscribe();
    const props_def = this.props.getDefinitionsForEntity(this.entityName);
    if ( (props_def !== undefined) || (props_def !== null) ) {
      this.defs = Object.entries(props_def);
      // console.log(this.defs);
      this.subs.sink = this.props.getInstance(this.entityType, this.objId)
        .subscribe(
            data => {
              console.log('Data loaded for MetaSymbol ObjId=', this.objId);
              this.responseData = data;
              this.dataSource = JSON.parse(this.responseData.Vals);
              this.UpdatedProperty = this.responseData.updated;
              this.parentVisibleChange.emit(true);
              // console.log(this.dataSource);
            },
            error => {
                const message = JSON.stringify( error.error) + '\n' + error.statusText;
                console.log(message);
            });
    }
  }

  onValueChanged(e) {
    // if (!e.value) {
      // if (this.dataSource) {
        // e.value = 'Hello'; // this.dataSource[ this.defs['name'] ].value;
     // e.component.value = 'Hello';
      // }
    // } else {
      // this.dataSource[ def['name'] ].value:0
     //   console.log(e);
      // }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public updateProperty() {
    this.dataSource[ 'ID' ].value = this.responseData.ID;
    // this.dataSource[ 'ObjectID' ].value = this.responseData.objId;
    this.responseData.Vals = JSON.stringify(this.dataSource);
    this.subs.sink = this.props.saveInstance(this.responseData)
    .subscribe(
     data => {
          console.log('Data saved: ');
          console.log(this.responseData);
          this.parentVisibleChange.emit(false);
     },
     error => {
         const message = JSON.stringify(error);
         console.log(message);
         notify(message);
    });
  }


}
