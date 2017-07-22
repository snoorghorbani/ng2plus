import { Component, OnInit } from '@angular/core';

import { Definition } from '../';

@Component({
  selector: 'app-nadarad',
  templateUrl: './nadarad.component.html',
  styleUrls: ['./nadarad.component.css']
})
export class NadaradComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}

Definition.declarations.push(NadaradComponent);