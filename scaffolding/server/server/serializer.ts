import * as ts from "typescript";
import * as fs from "fs";
import * as I from "./interfaces";

var resultFile = ts.createSourceFile("./someFileName.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
var printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed
});

export class Serializer {
    filePath: string;
    sourceFile: ts.SourceFile;
    program: ts.Program;
    checker: ts.TypeChecker;
    constructor(filePath: string, options: ts.CompilerOptions) {
        this.filePath = filePath;
        // Build a program using the set of root file names in fileNames
        this.program = ts.createProgram([filePath], options);
        // Get the checker, we will use it to find more about classes
        this.checker = this.program.getTypeChecker();
        this.sourceFile = this.program.getSourceFiles().find(i => i.fileName.includes('test.ts'));
    }

    visitAllNode(): I.visitResult {
        var res: I.visitResult = {
            classDecleration: {
                name: undefined,
                kind: undefined,
                flags: undefined,
                type: undefined,
                members: [],
                constructors: [],
                documentation: undefined,
                decorators: []
            },
            importDeclerations: []
        };
        ts.forEachChild(this.sourceFile, node => this.visit(node, res));
        return res;
    }
    visit(node: ts.Node, res: I.visitResult): I.visitResult {
        // var res: I.visitResult;
        // Only consider exported nodes
        if (!this.isNodeExported(node)) {
            return;
        }
        if (node.kind === ts.SyntaxKind.ImportDeclaration) {
            res.importDeclerations.push(this.extractImportDecleration(node));
        }
        else if (node.kind === ts.SyntaxKind.Decorator) {
            debugger
        }
        else if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            res.classDecleration = this.extractClassDecleration(<ts.ClassDeclaration>node)
            // No need to walk any further, class expressions/inner declarations
            // cannot be exported
        }
        else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
            // This is a namespace, visit its children
            ts.forEachChild(node, node => this.visit(node, res));
        }
    }
    extractByNodeKind(node) {
        if (ts.isIdentifier(node))
            return this.extractIdentifier(<ts.Identifier>node)

        switch (node.kind) {
            case ts.SyntaxKind.ObjectLiteralExpression:
                return this.extractObjectLiteralExpression(<ts.ObjectLiteralExpression>node);
            case ts.SyntaxKind.ArrayLiteralExpression:
                return this.extractArrayLiteralExpression(<ts.ArrayLiteralExpression>node);
            case ts.SyntaxKind.PropertyDeclaration:
                return this.extractPropertyDeclaration(<ts.PropertyDeclaration>node);
            case ts.SyntaxKind.Constructor:
                return this.extractConstructor(<ts.ConstructorDeclaration>node);
            case ts.SyntaxKind.NumericLiteral:
                return this.extractNumericLiteral(<ts.NumericLiteral>node);
            case ts.SyntaxKind.MethodDeclaration:
                return this.extractMethodDeclaration(<ts.MethodDeclaration>node);
            default:
                debugger
        }
        // if (node.kind === ts.SyntaxKind.ObjectLiteralExpression)
        //     methodName = "extractObjectLiteralExpression";
        // else if (node.kind === ts.SyntaxKind.ArrayLiteralExpression)
        //     methodName = "extractArrayLiteralExpression";
        // else if (node.kind === ts.SyntaxKind.PropertyDeclaration)
        //     methodName = "extractPropertyDeclaration";
        // else if (node.kind === ts.SyntaxKind.Constructor)
        //     methodName = "extractConstructor";
        // else if (node.kind === ts.SyntaxKind.NumericLiteral)
        //     methodName = "extractNumericLiteral"
        // else debugger

        // return {
        //     kind: node.kind,
        //     flags: node.flags,
        //     value: this[methodName](node)
        // }
    }
    extractMethodDeclaration(arg0: any): any {
        throw new Error("Method not implemented.");
    }
    extractIdentifier(node: ts.Identifier): I.Identifier {
        return {
            kind: ts.SyntaxKind.Identifier,
            flags: undefined,
            text: node.text
        }
    }
    extractClassMembersSymobl() {

    }
    extractImportDecleration(node): I.Import {
        return {
            kind: ts.SyntaxKind.ImportDeclaration,
            flags: node.flags,
            moduleSpecifier: node.moduleSpecifier.text,
            importClauses: node.importClause.namedBindings.elements.map(i => {
                return {
                    kind: ts.SyntaxKind.ImportClause,
                    flags: i.flags,
                    name: i.name.text
                }
            })
        };
    }
    extractClassDecleration(node: ts.ClassDeclaration): I.Class {
        var symbol = this.checker.getSymbolAtLocation(node.name);
        var serializedClass = this.serializeClass(symbol);

        return {
            name: symbol.name,
            kind: node.kind,
            flags: node.flags,
            members: node.members.map(member => {
                return this.extractByNodeKind(member);
            }),
            type: serializedClass.type,
            constructors: serializedClass.constructors,
            documentation: serializedClass.documentation,
            decorators: node.decorators.map(decoratorNode => this.extractDecorator(decoratorNode))
        };
    }
    extractDecorator(decoratorNode) {
        return {
            kind: decoratorNode.kind,
            flags: decoratorNode.flags,
            expression: {
                kind: decoratorNode.expression.kind,
                flags: decoratorNode.expression.flags,
                expression: {
                    text: decoratorNode.expression.expression.text,
                    arguments: this.extractArguments(decoratorNode.expression)
                }
            }
        };
    }
    extractArguments(expressionNode) {
        return expressionNode.arguments.map(argumentNode => {
            var methodName: string;
            if (argumentNode.kind === ts.SyntaxKind.ObjectLiteralExpression)
                methodName = "extractObjectLiteralExpression";
            else if (argumentNode.kind === ts.SyntaxKind.ArrayLiteralExpression)
                methodName = "extractArrayLiteralExpression";

            return this[methodName](argumentNode)
        })
    }
    extractObjectLiteralExpression(node) {
        return {
            flags: node.flags,
            kind: ts.SyntaxKind.ObjectLiteralExpression,
            properties: node.properties.map(propertyNodeItem => this.extractPropertyDeclaration(propertyNodeItem))
        }
    }
    extractPropertyDeclaration(propertyNodeItem: ts.PropertyDeclaration): I.PropertyDecleration {
        return {
            kind: propertyNodeItem.kind,
            flags: propertyNodeItem.flags,
            name: {
                text: propertyNodeItem.name.getText()
            },
            initializer: this.extractByNodeKind(propertyNodeItem.initializer)
        }
    }
    extractNumericLiteral(node: ts.NumericLiteral): I.NumericLiteralDecleration {
        return {
            kind: node.kind,
            flags: node.flags,
            text: node.text
        }
    }
    extractConstructor(node: ts.ConstructorDeclaration): I.Constructor {
        return {
            kind: node.kind,
            flags: node.flags,
            parameters: node.parameters.map(paramNode => {
                return {
                    kind: paramNode.kind,
                    flags: paramNode.flags,
                }
            })
        }
    }
    extractArrayLiteralExpression(node: ts.ArrayLiteralExpression): I.ArrayLiteralExpression {
        return {
            kind: node.kind,
            flags: node.flags,
            // multiLine: node.multiLine,
            elements: node.elements.map(member => this.extractByNodeKind(member))
        }
    }
    serializeSymbol(symbol: ts.Symbol): I.DocEntry {
        return {
            name: symbol.getName(),
            documentation: ts.displayPartsToString(symbol.getDocumentationComment()),
            type: this.checker.typeToString(this.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration))
        };
    }
    /** Serialize a class symbol information */
    serializeClass(symbol: ts.Symbol) {
        let details = this.serializeSymbol(symbol);

        // Get the construct signatures
        let constructorType = this.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
        details.constructors = constructorType.getConstructSignatures().map(signature => this.serializeSignature(signature));
        return details;
    }
    /** Serialize a signature (call or construct) */
    serializeSignature(signature: ts.Signature) {
        return {
            parameters: signature.parameters.map(symbol => this.serializeSymbol(symbol)),
            returnType: this.checker.typeToString(signature.getReturnType()),
            documentation: ts.displayPartsToString(signature.getDocumentationComment())
        };
    }
    /** True if this is visible outside this file, false otherwise */
    isNodeExported(node: ts.Node): boolean {
        return (node.flags & ts.NodeFlags.ExportContext) !== 0 || (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
    }
}