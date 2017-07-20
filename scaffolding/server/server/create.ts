import * as ts from "typescript";
import * as fs from "fs";
import * as I from "./interfaces";

export var createImport = function ({ importClauses, moduleSpecifier }) {
    // var decorator = ts.createDecorator(ts.createLiteral("decorator"));
    // var importSpecifier = ts.createImportSpecifier(ts.createIdentifier("test1"), ts.createIdentifier("test2"));
    // var namedImportBinding = ts.createNamedImports([importSpecifier]);
    return ts.createImportDeclaration(
        undefined,
        undefined,
        createImportClause(importClauses, undefined),
        ts.createLiteral(moduleSpecifier)
    );
}
export var createImportClause = function (importClauses: I.importClause[], namedBindings) {
    var identifiers = "{" + importClauses.map(i => i.name).join(",") + "}";
    var importIdentifier = ts.createIdentifier(identifiers);
    return ts.createImportClause(importIdentifier, undefined)
}
export var createArrayLiteral = function (initializer) {
    return ts.createArrayLiteral(initializer.elements.map(i => ts.createIdentifier(i.text)), initializer.multiLine);
}
export var createIdentifier = function (text) {
    return ts.createIdentifier(text);
}
export var createObjectLiteral = function ({ properties }) {
    return ts.createObjectLiteral(
        properties.map(property => createPropertyAssignment({ property }))
    )
}
export var createArguments = function ({ expression }) {
    return expression.arguments.map(argumentItem => {
        switch (argumentItem.kind) {
            case ts.SyntaxKind.ObjectLiteralExpression:
                return createObjectLiteral(argumentItem);
        }
        debugger;
    })
}
export var createPropertyAssignment = function ({ property }) {
    return ts.createPropertyAssignment(
        createIdentifier(property.name.text),
        createArrayLiteral(property.initializer)
    )
}
export var createCall = function ({ expression, typeArguments, argumentsArray }) {
    return ts.createCall(
        expression,
        typeArguments,
        argumentsArray
    )

}
export var createDecorators = function ({ decorators }) {
    return decorators.map(decorator => createDecorator({ decorator }))
}
export var createDecorator = function ({ decorator }) {
    return ts.createDecorator(
        createCall({
            expression: createIdentifier(decorator.expression.expression.text),
            typeArguments: undefined,
            argumentsArray: createArguments(decorator.expression)
        })
    )
}
export var createClass = function ({ decorators, name, modifiers, typeParameters = undefined, heritageClauses = undefined, members = undefined }) {
    return ts.createClassDeclaration(decorators, modifiers, name, typeParameters /*[ts.createTypeParameterDeclaration("testParameter", )]*/, undefined, undefined);
}