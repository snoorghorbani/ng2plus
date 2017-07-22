import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { dashboardDefinition, ComponentDefinition } from '../..';

@Component({
  selector: 'app-component-definition',
  templateUrl: './component-definition.component.html',
  styleUrls: ['./component-definition.component.css']
})
export class ComponentDefinitionComponent implements OnInit {
  @Input()
  componentDef: ComponentDefinition;
  @Input()
  componenDependencies;

  root = 'A:\\git\\ng2plus\\scaffolding\\client\\src\\';
  name: string = 'test';

  constructor() { }

  ngOnInit() {
  }

}

dashboardDefinition.declarations.push(ComponentDefinitionComponent);