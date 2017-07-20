
import * as ts from "typescript";
import * as fs from "fs";
import * as I from "./interfaces";
import * as creator from "./create";

export class Printer {
    fileContent: string = "";
    resultFile: ts.SourceFile;
    printer: ts.Printer;

    constructor() {
        this.resultFile = ts.createSourceFile("./someFileName.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
        this.printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed
        });
    }

    printNode(node: ts.Node): this {
        debugger;
        return this;
    }
    print(): string {

        return this.fileContent;
    }
}