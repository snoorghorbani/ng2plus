"use strict";
exports.__esModule = true;
var ts = require("typescript");
var fs = require("fs");
var create = require("./create");
var serializer_1 = require("./serializer");
var resultFile = ts.createSourceFile("./someFileName.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
var printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed
});
var serializer = new serializer_1.Serializer(".\\test.ts", {
    target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
});
var data = serializer.visitAllNode();
fs.writeFileSync("classes.json", JSON.stringify(data, undefined, 4));
data.importDeclerations.forEach(function (importItemNode) {
    var importDeclaration = create.createImport(importItemNode);
    var result = printer.printNode(ts.EmitHint.Unspecified, importDeclaration, resultFile);
    var xx = printer.printFile(resultFile);
    console.log(result);
});
// data.member.map(i => createClassElem(i))
debugger;
// var classDeclaration = create.createClass({
//     name: create.createIdentifier(data.classDecleration.name),
//     decorators: create.createDecorators(data.classDecleration),
//     modifiers: [ts.createToken(ts.SyntaxKind.ExportKeyword)], //todo
//     typeParameters: undefined,
//     heritageClauses: undefined,
//     members: create.createClassElements(data.classDecleration.members)
// })
var classDeclaration = create.createClass(data.classDecleration);
var result = printer.printNode(ts.EmitHint.Unspecified, classDeclaration, resultFile);
console.log(result);
