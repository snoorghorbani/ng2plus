import { Component, OnInit } from '@angular/core';

import { Definition } from '../';

@Component({
  selector: 'app-koon',
  templateUrl: './koon.component.html',
  styleUrls: ['./koon.component.css']
})
export class KoonComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}

Definition.declarations.push(KoonComponent);