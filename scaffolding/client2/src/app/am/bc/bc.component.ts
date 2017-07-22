import { Component, OnInit } from '@angular/core';

import { AmDefinition } from '../';

@Component({
  selector: 'app-bc',
  templateUrl: './bc.component.html',
  styleUrls: ['./bc.component.css']
})
export class BcComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}

AmDefinition.declarations.push(BcComponent);