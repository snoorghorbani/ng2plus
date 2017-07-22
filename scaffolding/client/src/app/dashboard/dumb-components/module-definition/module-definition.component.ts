import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../app.service';

import {  componentFile } from '../../../../interfaces/app';
import { dashboardDefinition, ModuleDefinition } from '../..';

@Component({
  selector: 'app-module-definition',
  templateUrl: './module-definition.component.html',
  styleUrls: ['./module-definition.component.css']
})
export class ModuleDefinitionComponent implements OnInit {
  @Input()
  moduleDef: ModuleDefinition;
  @Input()
  moduleDependencies;

  root = 'A:\\git\\ng2plus\\scaffolding\\client\\src\\';
  name: string = 'test';
  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  generate_module(module) {
    this.appService
      .generateModule({
        path: this.moduleDef.path,
        name: this.name
      })
      .subscribe(data => {
        debugger
      });
  }
  generate_component(module) {
    this.appService
      .generateComponent({
        path: this.moduleDef.path,
        name: this.name
      })
      .subscribe(data => {
        debugger
      });
  }
}

dashboardDefinition.declarations.push(ModuleDefinitionComponent);