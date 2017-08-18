import {
  Component, ViewChild, AfterViewInit, ElementRef, trigger, state, style, transition, animate
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { menuState } from "../../../full-layout/full-layout.service";
import { FullLayoutService } from "../../../full-layout/full-layout.service";

@Component({
  selector: 'app-logo-container',
  templateUrl: './logo-container.component.html',
  styleUrls: ['./logo-container.component.css'],
  animations: [
    trigger('shatelLogoAnimation', [
      state(menuState.comfortable, style({
        transform: 'translateY(20px) scale(1)',
        opacity: 1
      })),
      state(menuState.compact, style({
        transform: 'translateY(-20px) scale(0.1)',
        opacity: 0
      })),
      transition([menuState.comfortable, ' => ', menuState.compact].join(''), animate('200ms ease-in')),
      transition([menuState.compact, ' => ', menuState.comfortable].join(''), animate('600ms ease-out'))
    ]),

    trigger('logoTypeAnimation', [
      state(menuState.comfortable, style({
        transform: 'translateY(-80px)',
        opacity: 0
      })),
      state(menuState.compact, style({
        transform: 'translateY(26px)',
        opacity: 1
      })),
      transition([menuState.comfortable, ' => ', menuState.compact].join(''), animate('400ms ease-in')),
      transition([menuState.compact, ' => ', menuState.comfortable].join(''), animate('400ms ease-out'))
    ])
  ]
})
export class LogoContainerComponent {
  toolbarAnimationState: string;

  constructor(private service: FullLayoutService) {
    this.service.toolbarAnimationState.subscribe(state => {
      setTimeout(() => {
        this.toolbarAnimationState = state;
      }, 0);
    })
  }
}
