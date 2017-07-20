"use strict";
exports.__esModule = true;
var ts = require("typescript");
var Printer = (function () {
    function Printer() {
        this.fileContent = "";
        this.resultFile = ts.createSourceFile("./someFileName.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
        this.printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed
        });
    }
    Printer.prototype.printNode = function (node) {
        debugger;
        return this;
    };
    Printer.prototype.print = function () {
        return this.fileContent;
    };
    return Printer;
}());
exports.Printer = Printer;
