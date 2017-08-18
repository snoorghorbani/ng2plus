import { Component, ViewChild, AfterViewInit, ElementRef, trigger, state, style, transition, animate } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { menuState } from "../../../full-layout/full-layout.service";
import { FullLayoutService } from "../../../full-layout/full-layout.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  animations: [
    trigger('menuAnimation', [
      state(menuState.comfortable, style({
      })),
      state(menuState.compact, style({
      })),
      transition([menuState.comfortable, ' => ', menuState.compact].join(''), animate('400ms ease-in')),
      transition([menuState.compact, ' => ', menuState.comfortable].join(''), animate('400ms ease-out'))
    ])
  ]
})
export class MainMenuComponent {
  toolbarAnimationState = this.service.toolbarAnimationState;
  constructor(private service: FullLayoutService) { }
  ngOnInit() { }
}
