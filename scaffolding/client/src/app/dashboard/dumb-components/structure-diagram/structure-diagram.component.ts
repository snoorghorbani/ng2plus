import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

import { dashboardDefinition } from '../..';
import { AppService } from '../../app.service';


@Component({
  selector: 'app-structure-diagram',
  templateUrl: './structure-diagram.component.html',
  styleUrls: ['./structure-diagram.component.css']
})
export class StructureDiagramComponent implements OnInit {
  @Output() entitySelect = new EventEmitter();
  dim: number = 500;
  root = 'A:\\git\\ng2plus\\scaffolding\\client\\src\\';
  _modules: any[] = [];

  @Input()
  get modules() {
    return this._modules;
  }
  set modules(data) {
    if (data.length == 0) return;
    this._modules = data;
    this.chart();
  }

  constructor() { }

  ngOnInit() {
    this.dim = document.body.clientHeight;
  }



  chart() {
    var svg = d3.select("svg"),
      margin = 20,
      diameter = +svg.attr("width"),
      g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    var color = d3.scaleLinear<string, string>()
      .domain([-1, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);

    var pack = d3.pack()
      .size([diameter - margin, diameter - margin])
      .padding(2);




    var root = d3.hierarchy<any>(this.modules[0])
      .sum(function (d) { return (d.type == 'module' ? 2 : 1) + ((d.modules) ? 3 * d.modules.length : 0) + ((d.components) ? 1 * d.components.length : 0) })
      .sort(function (a, b) { return b.value - a.value; });

    var focus = root,
      nodes = pack(<any>root).descendants(),
      view;

    var circle = g.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("class", function (d) {
        var type = d.data.type;
        return d.parent ? d.children ? ("node " + type) : ("node node--leaf " + type) : "node node--root";
      })
      .style("fill", function (d) { return d.children ? color(d.depth) : null; })
      .on("click", (d) => {
        if (focus !== d) {
          zoom(d);
          d3.event.stopPropagation();
          this.entitySelect.emit(d);
        }
      });

    var text = g.selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
      .style("display", function (d) { return d.parent === root ? "inline" : "none"; })
      .text(function (d) { return d.data.name; });

    var node = g.selectAll("circle,text");

    svg
      .style("background", color(-1))
      .on("click", function () { zoom(root); });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    function zoom(d) {
      var focus0 = focus; focus = d;

      var transition = d3.transition("")
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function (d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function (t) { zoomTo(i(t)); };
        });

      transition.selectAll("text")
        .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function (d) { return d.parent === focus ? 1 : 0; })
        .on("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function (d) { if (d.parent !== focus) this.style.display = "none"; });
    }

    function zoomTo(v) {
      var k = diameter / v[2]; view = v;
      node.attr("transform", function (d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
      circle.attr("r", function (d) { return d.r * k; });
    }

  }
}

dashboardDefinition.declarations.push(StructureDiagramComponent);