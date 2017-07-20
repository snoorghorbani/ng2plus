import * as ts from "typescript";
import * as fs from "fs";
import * as create from "./create";
import { Serializer } from "./serializer";

var resultFile = ts.createSourceFile("./someFileName.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
var printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed
});

var serializer = new Serializer(
    "A:\\git\\@ng2plus\\scaffolding\\client\\src\\app\\shared\\shared.module.ts",
    {
        target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
    }
);
var data = serializer.visitAllNode();
debugger
fs.writeFileSync("classes.json", JSON.stringify(data, undefined, 4));

// data.importDeclerations.forEach(importItemNode => {
//     var importDeclaration = create.createImport(importItemNode);
//     var result = printer.printNode(ts.EmitHint.Unspecified, importDeclaration, resultFile);
//     var xx = printer.printFile(resultFile);
//     console.log(result);
// })

// var classDeclaration = create.createClass({
//     name: create.createIdentifier(data.classDecleration.name),
//     decorators: create.createDecorators(data.classDecleration),
//     modifiers: [ts.createToken(ts.SyntaxKind.ExportKeyword)], //todo
//     typeParameters: undefined,
//     heritageClauses: undefined,
//     members: undefined
// })

// var result = printer.printNode(ts.EmitHint.Unspecified, classDeclaration, resultFile);
// console.log(result);