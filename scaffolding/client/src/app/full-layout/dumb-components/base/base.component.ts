import { Component, ViewChild, AfterViewInit, ElementRef, trigger, state, style, transition, animate } from '@angular/core';
import { HostListener, HostBinding } from "@angular/core";
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { FullLayoutService } from "../../full-layout.service";

const menuState = {
    'comfortable': 'comfortable',
    'compact': 'compact'
}

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css'],
    animations: [
        trigger('toolbarAnimation', [
            state(menuState.comfortable, style({
                backgroundColor: 'rgba(244,244,244,1)',
                height: '190px',
                boxShadow: '1px 1px 3px rgba(0,0,0,0)'

            })),
            state(menuState.compact, style({
                backgroundColor: 'rgba(256,256,256,1)',
                height: '64px',
                boxShadow: '1px 1px 3px rgba(0,0,0,0.5)'

            })),
            transition([menuState.comfortable, ' => ', menuState.compact].join(''), animate('400ms ease-in')),
            transition([menuState.compact, ' => ', menuState.comfortable].join(''), animate('400ms ease-out'))
        ]),
        trigger('footerAnimation', [
            state(menuState.comfortable, style({
                "transform": "translateY(0)"
            })),
            state(menuState.compact, style({
                "transform": "translateY(calc(100% - 40px))"
            })),
            transition([menuState.comfortable, ' => ', menuState.compact].join(''), animate('400ms ease-in')),
            transition([menuState.compact, ' => ', menuState.comfortable].join(''), animate('400ms ease-out'))
        ]),
        trigger('menuAnimation', [
            state(menuState.comfortable, style({
                bottom: '25px'
            })),
            state(menuState.compact, style({
                bottom: '15px'
            })),
            transition([menuState.comfortable, ' => ', menuState.compact].join(''), animate('400ms ease-in')),
            transition([menuState.compact, ' => ', menuState.comfortable].join(''), animate('400ms ease-out'))
        ])
    ]
})
export class BaseComponent {
    toolbarAnimationState = this.service.toolbarAnimationState;
    footerDisplayState = this.service.footerDisplayState;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private elem: ElementRef,
        private service: FullLayoutService
    ) { }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        let scrolledAmount = this.document.body.scrollTop;
        if (scrolledAmount > 60) {
            this.service.setState(menuState.compact);
        } else {
            this.service.setState(menuState.comfortable);
        }
    }

    onFooterMouseEnter() {
        debugger;
        this.service.setFooterDisplayState(menuState.comfortable);
    }
    onFooterMouseLeave() {
        debugger;
        this.service.setFooterDisplayState(menuState.compact);
    }

    updates: Object[] = updates;
}


















var updates = [{
    description: 'Agnostic filtering with (inputChange) and [debounce] (local vs server side)',
    icon: 'label',
    route: '/components/chips',
    title: 'Chips feature',
}, {
    description: 'object list and template support and new [td-chip-avatar] attribute',
    icon: 'label',
    route: '/components/chips',
    title: 'Chips feature',
}, {
    description: 'new [chipRemoval] input',
    icon: 'label',
    route: '/components/chips',
    title: 'Chips feature',
}, {
    description: 'new [color] input',
    icon: 'label',
    route: '/components/chips',
    title: 'Chips feature',
}, {
    description: 'new [stacked] input',
    icon: 'label',
    route: '/components/chips',
    title: 'Chips feature',
}, {
    description: 'new td-expansion-panel-group component',
    icon: 'open_with',
    route: '/components/expansion-panel',
    title: 'Expansion panel feature',
}, {
    description: 'new [disableRipple] input',
    icon: 'open_with',
    route: '/components/expansion-panel',
    title: 'Expansion panel feature',
}, {
    description: 'new [mode], [opened], [sidenavWidth] inputs for td-layout',
    icon: 'view_quilt',
    route: '/layouts',
    title: 'Layouts feature',
}, {
    description: 'new [color] input for td-layout-footer',
    icon: 'view_quilt',
    route: '/layouts',
    title: 'Layouts feature',
}, {
    description: 'animation when opening/closing',
    icon: 'info_outline',
    route: '/components/message',
    title: 'Message feature',
}, {
    description: 'new [disableRipple] input',
    icon: 'view_list',
    route: '/components/steps',
    title: 'Stepper feature',
},
];