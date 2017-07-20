"use strict";
exports.__esModule = true;
var ts = require("typescript");
var resultFile = ts.createSourceFile("./someFileName.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
var printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed
});
var Serializer = (function () {
    function Serializer(filePath, options) {
        this.filePath = filePath;
        // Build a program using the set of root file names in fileNames
        this.program = ts.createProgram([filePath], options);
        // Get the checker, we will use it to find more about classes
        this.checker = this.program.getTypeChecker();
        this.sourceFile = this.program.getSourceFiles().pop();
    }
    Serializer.prototype.visitAllNode = function () {
        var _this = this;
        var res = {
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
        ts.forEachChild(this.sourceFile, function (node) { return _this.visit(node, res); });
        return res;
    };
    Serializer.prototype.visit = function (node, res) {
        var _this = this;
        // var res: I.visitResult;
        // Only consider exported nodes
        if (!this.isNodeExported(node)) {
            return;
        }
        if (node.kind === ts.SyntaxKind.ImportDeclaration) {
            res.importDeclerations.push(this.extractImportDecleration(node));
        }
        else if (node.kind === ts.SyntaxKind.Decorator) {
            debugger;
        }
        else if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            res.classDecleration = this.extractClassDecleration(node);
            // No need to walk any further, class expressions/inner declarations
            // cannot be exported
        }
        else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
            // This is a namespace, visit its children
            ts.forEachChild(node, function (node) { return _this.visit(node, res); });
        }
    };
    Serializer.prototype.extractByNodeKind = function (node) {
        if (ts.isIdentifier(node))
            return this.extractIdentifier(node);
        switch (node.kind) {
            case ts.SyntaxKind.ObjectLiteralExpression:
                return this.extractObjectLiteralExpression(node);
            case ts.SyntaxKind.ArrayLiteralExpression:
                return this.extractArrayLiteralExpression(node);
            case ts.SyntaxKind.PropertyDeclaration:
                return this.extractPropertyDeclaration(node);
            case ts.SyntaxKind.Constructor:
                return this.extractConstructor(node);
            case ts.SyntaxKind.NumericLiteral:
                return this.extractNumericLiteral(node);
            default:
                debugger;
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
    };
    Serializer.prototype.extractIdentifier = function (node) {
        return {
            kind: ts.SyntaxKind.Identifier,
            flags: undefined,
            text: node.text
        };
    };
    Serializer.prototype.extractClassMembersSymobl = function () {
    };
    Serializer.prototype.extractImportDecleration = function (node) {
        return {
            kind: ts.SyntaxKind.ImportDeclaration,
            flags: node.flags,
            moduleSpecifier: node.moduleSpecifier.text,
            importClauses: node.importClause.namedBindings.elements.map(function (i) {
                return {
                    kind: ts.SyntaxKind.ImportClause,
                    flags: i.flags,
                    name: i.name.text
                };
            })
        };
    };
    Serializer.prototype.extractClassDecleration = function (node) {
        var _this = this;
        var symbol = this.checker.getSymbolAtLocation(node.name);
        var serializedClass = this.serializeClass(symbol);
        debugger;
        return {
            name: symbol.name,
            kind: node.kind,
            flags: node.flags,
            members: node.members.map(function (member) {
                return _this.extractByNodeKind(member);
            }),
            type: serializedClass.type,
            constructors: serializedClass.constructors,
            documentation: serializedClass.documentation,
            decorators: node.decorators.map(function (decoratorNode) { return _this.extractDecorator(decoratorNode); })
        };
    };
    Serializer.prototype.extractDecorator = function (decoratorNode) {
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
    };
    Serializer.prototype.extractArguments = function (expressionNode) {
        var _this = this;
        return expressionNode.arguments.map(function (argumentNode) {
            var methodName;
            if (argumentNode.kind === ts.SyntaxKind.ObjectLiteralExpression)
                methodName = "extractObjectLiteralExpression";
            else if (argumentNode.kind === ts.SyntaxKind.ArrayLiteralExpression)
                methodName = "extractArrayLiteralExpression";
            return _this[methodName](argumentNode);
        });
    };
    Serializer.prototype.extractObjectLiteralExpression = function (node) {
        var _this = this;
        return {
            flags: node.flags,
            kind: ts.SyntaxKind.ObjectLiteralExpression,
            properties: node.properties.map(function (propertyNodeItem) { return _this.extractPropertyDeclaration(propertyNodeItem); })
        };
    };
    Serializer.prototype.extractPropertyDeclaration = function (propertyNodeItem) {
        if (!propertyNodeItem.initializer)
            debugger;
        debugger;
        return {
            kind: propertyNodeItem.kind,
            flags: propertyNodeItem.flags,
            name: {
                text: propertyNodeItem.name.getText()
            },
            initializer: this.extractByNodeKind(propertyNodeItem.initializer)
        };
    };
    Serializer.prototype.extractNumericLiteral = function (node) {
        return {
            kind: node.kind,
            flags: node.flags,
            text: node.text
        };
    };
    Serializer.prototype.extractConstructor = function (node) {
        return {
            kind: node.kind,
            flags: node.flags,
            parameters: node.parameters.map(function (paramNode) {
                return {
                    kind: paramNode.kind,
                    flags: paramNode.flags
                };
            })
        };
    };
    Serializer.prototype.extractArrayLiteralExpression = function (node) {
        var _this = this;
        debugger;
        return {
            kind: node.kind,
            flags: node.flags,
            // multiLine: node.multiLine,
            elements: node.elements.map(function (member) { return _this.extractByNodeKind(member); })
        };
    };
    Serializer.prototype.serializeSymbol = function (symbol) {
        return {
            name: symbol.getName(),
            documentation: ts.displayPartsToString(symbol.getDocumentationComment()),
            type: this.checker.typeToString(this.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration))
        };
    };
    /** Serialize a class symbol information */
    Serializer.prototype.serializeClass = function (symbol) {
        var _this = this;
        var details = this.serializeSymbol(symbol);
        // Get the construct signatures
        var constructorType = this.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
        details.constructors = constructorType.getConstructSignatures().map(function (signature) { return _this.serializeSignature(signature); });
        return details;
    };
    /** Serialize a signature (call or construct) */
    Serializer.prototype.serializeSignature = function (signature) {
        var _this = this;
        return {
            parameters: signature.parameters.map(function (symbol) { return _this.serializeSymbol(symbol); }),
            returnType: this.checker.typeToString(signature.getReturnType()),
            documentation: ts.displayPartsToString(signature.getDocumentationComment())
        };
    };
    /** True if this is visible outside this file, false otherwise */
    Serializer.prototype.isNodeExported = function (node) {
        return (node.flags & ts.NodeFlags.ExportContext) !== 0 || (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
    };
    return Serializer;
}());
exports.Serializer = Serializer;
