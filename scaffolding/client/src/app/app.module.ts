import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppStoreModule } from './infra';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
        AppDefinition
} from './app.global';

import {
        AppComponent
} from './app.component';

import { DashboardModule } from './dashboard'
import {
        trigger,
        state,
        style,
        animate,
        transition
} from '@angular/animations';

@NgModule({
        imports: [
                BrowserModule,
                CoreModule,
                RouterModule.forRoot([]),
                AppStoreModule,

        ].concat(AppDefinition.imports),
        declarations: [
                AppComponent,
        ],
        bootstrap: [AppComponent]
})
export class AppModule { }
