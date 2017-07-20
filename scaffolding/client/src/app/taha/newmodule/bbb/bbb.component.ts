import { Component, OnInit } from '@angular/core';

import { NewmoduleDefinition } from '../';

@Component({
  selector: 'app-bbb',
  templateUrl: './bbb.component.html',
  styleUrls: ['./bbb.component.css']
})
export class BbbComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}

NewmoduleDefinition.declarations.push(BbbComponent);