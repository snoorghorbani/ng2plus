import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {  } from '@angular/compiler';

import { AppDefinition } from '..';
import { SharedModule } from '../shared';

import { dashboardDefinition, IndexComponent } from './';
import { AppService } from './app.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [AppService],
  declarations: dashboardDefinition.declarations
})
export class DashboardModule { }

AppDefinition.imports.push(DashboardModule);