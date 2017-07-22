import { Component, OnInit } from '@angular/core';
import { NgModuleCompiler ,CompileReflector} from '@angular/compiler';
import { TahaDefinition } from '../';

@Component({
  selector: 'app-aa',
  templateUrl: './aa.component.html',
  styleUrls: ['./aa.component.css']
})
export class AaComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}

TahaDefinition.declarations.push(AaComponent);