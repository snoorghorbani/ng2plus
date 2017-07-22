import { Component, OnInit } from '@angular/core';

import { Definition } from '../';

@Component({
  selector: 'app-testcdd',
  templateUrl: './testcdd.component.html',
  styleUrls: ['./testcdd.component.css']
})
export class TestcddComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}

Definition.declarations.push(TestcddComponent);