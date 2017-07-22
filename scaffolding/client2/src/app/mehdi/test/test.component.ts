import { Component, OnInit } from '@angular/core';

import { Definition } from '../';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}

Definition.declarations.push(TestComponent);