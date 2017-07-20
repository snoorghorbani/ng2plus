import { Injectable } from '@angular/core';
import { Component, ViewChild, AfterViewInit, ElementRef, trigger, state, style, transition, animate } from '@angular/core';
import { HostListener, HostBinding } from "@angular/core";
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'


export const menuState = {
  'comfortable': 'comfortable',
  'compact': 'compact'
}

@Injectable()
export class FullLayoutService {
  toolbarAnimationState = new BehaviorSubject(menuState.comfortable);
  footerDisplayState = new BehaviorSubject(menuState.compact);

  constructor( @Inject(DOCUMENT) private document: Document) { }

  setState(value) {
    if (this.toolbarAnimationState.getValue() == value) return this;
    this.toolbarAnimationState.next(value);
  }

  setFooterDisplayState(value) {
    // if (this.footerDisplayState.getValue() == value) return this;
    this.footerDisplayState.next(value);
  }

}
