import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule, MdButton } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


import {
        CovalentLayoutModule,
        CovalentNotificationsModule,
        CovalentMenuModule,
        CovalentSearchModule,
        CovalentDataTableModule,
        CovalentPagingModule,
        CovalentExpansionPanelModule
} from '@covalent/core'
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';

@NgModule({
        imports: [
                CommonModule,
                RouterModule,
                FormsModule,
                HttpModule,
                BrowserAnimationsModule,
                FlexLayoutModule,
                MaterialModule,
                CovalentLayoutModule,
                CovalentMenuModule,
                CovalentHighlightModule,
                CovalentHttpModule,
                CovalentMarkdownModule,
                CovalentDynamicFormsModule,
                CovalentLayoutModule,
                CovalentNotificationsModule,
                CovalentSearchModule,
                CovalentPagingModule,
                CovalentExpansionPanelModule
        ],
        declarations: [],
        exports: [
                CommonModule,
                RouterModule,
                FormsModule,
                HttpModule,
                BrowserAnimationsModule,
                FlexLayoutModule,
                MaterialModule,
                CovalentLayoutModule,
                CovalentMenuModule,
                CovalentHighlightModule,
                CovalentHttpModule,
                CovalentMarkdownModule,
                CovalentDynamicFormsModule,
                CovalentLayoutModule,
                CovalentNotificationsModule,
                CovalentSearchModule,
                CovalentDataTableModule,
                CovalentPagingModule,
                CovalentExpansionPanelModule
        ]
})
export class SharedModule {
        constructor(test: string = "ali") { }
        test: number = 2;
        zz(param1: string, param2: number) { }
}