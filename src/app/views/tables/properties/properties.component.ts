import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { PropsService } from '../../../services/props.service';
import { EntitiesEnum, DynamicProperties, DynamicProperty, DynamicPropertyDefinition } from '../../../models/Props';
import notify from 'devextreme/ui/notify';
import { group } from '@angular/animations';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() parentVisible = false;
  @Output() parentVisibleChange = new EventEmitter<boolean>();

  public objId: number;
  public defs: {[key: string]: any };
  public responseData: DynamicProperties;
  public dataSource: {[key: string]: DynamicProperty<any> }; //  Map<string, DynamicProperty<any> >;

  constructor(public props: PropsService) {
    super();
    this.dataSource = undefined;
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

  setData(val: number, entityName: string, entityType: number): void {
    this.objId = val;
    this.subs.unsubscribe();
    const props_def = this.props.getDefinitionsForEntity(entityName);
    if ( (props_def !== undefined) || (props_def !== null) ) {
      this.defs = Object.entries(props_def);
      // console.log(props_def);
      const mydefs: Map<string, DynamicPropertyDefinition<any> > = new Map<string, DynamicPropertyDefinition<any> >();
      // tslint:disable-next-line: forin
      for (const key in props_def) {
        props_def[key].forEach( elements => {
          mydefs.set(elements.name, elements);
        });
      }
      // console.log(this.defs);
      this.subs.sink = this.props.getInstance(entityType, this.objId)
        .subscribe(
            data => {
              // console.log('Data loaded for MetaSymbol ObjId=', this.objId);
              this.responseData = data;

              const setupData: Map<string, DynamicProperty<any> > = JSON.parse(this.responseData.Vals);
              this.dataSource = {};

              // console.log(setupData);
              mydefs.forEach(el => {
                const resval = setupData[el.name]; // vals.find(e => e.name === element.name);
                if ( resval === undefined ) {
                  console.log('property: ' + el.name + ' is not set. Set to default.');
                  const newProp: DynamicProperty<any> = {
                     value: el.defaultValue,
                     type: el.type,
                  };
                  this.dataSource[el.name] = newProp;
                } else {
                  this.dataSource[el.name] = resval;
                }
              });
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
    this.dataSource = undefined;
    super.ngOnDestroy();
  }

  public updateProperty() {
    this.dataSource[ 'ID' ].value = this.responseData.ID;
    this.dataSource[ 'ObjectID' ].value = this.responseData.objId;
    this.responseData.Vals = JSON.stringify(this.dataSource);
    this.subs.sink = this.props.saveInstance(this.responseData)
    .subscribe(
     data => {
          // console.log('Data saved: ');
          // console.log(this.responseData);
          this.dataSource = undefined;
          this.parentVisibleChange.emit(false);
     },
     error => {
         const message = JSON.stringify(error);
         console.log(message);
         notify(message);
    });
  }


}
