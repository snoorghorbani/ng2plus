import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls:  ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isScrolled = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 100;

    constructor() { }
    @HostListener('window:scroll', ['$event'])
    onScrollEvent(event) {
        console.log("scrolling: ", event);
        this.currPos = (window.pageYOffset || event.target.scrollTop) - (event.target.clientTop || 0);
        if (this.currPos >= this.changePos) {
            this.isScrolled = true;
        } else {
            this.isScrolled = false;
        }
    }

    ngOnInit() {
    }
}
