import { Component, OnInit } from '@angular/core';

import { RaeesDefinition } from '../';

@Component({
  selector: 'app-salam',
  templateUrl: './salam.component.html',
  styleUrls: ['./salam.component.css']
})
export class SalamComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}

RaeesDefinition.declarations.push(SalamComponent);