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
export var createParameter = function (
    { decorators = undefined, modifiers = undefined, dotDotDotToken = undefined, name = undefined, questionToken = undefined, type = undefined, initializer = undefined }
        : { decorators: any, modifiers: any, dotDotDotToken: any, name: any, questionToken?: any, type?: any, initializer?: any }
) {
    return ts.createParameter(decorators, modifiers, dotDotDotToken, name, questionToken, type, initializer);
}
export var createClassElements = function (members: I.ClassElement[]) {
    return members.map(member => {
        switch (member.kind) {
            case ts.SyntaxKind.Constructor:
                debugger
                return createConstructor({
                    decorators: undefined,
                    modifiers: undefined,
                    parameters: (<I.Constructor>member).parameters.map(param => createParameter({
                        decorators: undefined,
                        modifiers: undefined,
                        dotDotDotToken: undefined,
                        name: param.name.text,
                        type: ts.createKeywordTypeNode((param.type as ts.KeywordTypeNode).kind)

                    })),
                    body: undefined,
                });
            case ts.SyntaxKind.PropertyDeclaration:
                return createProperty({
                    decorators: undefined,
                    modifiers: undefined,
                    name: undefined,
                    questionToken: undefined,
                    type: undefined,
                    initializer: undefined,
                })
            case ts.SyntaxKind.MethodDeclaration:
                return createMethod({
                    decorators: undefined,
                    modifiers: undefined,
                    asteriskToken: undefined,
                    name: undefined,
                    questionToken: undefined,
                    typeParameters: undefined,
                    Parameters: undefined,
                    type: undefined,
                    body: undefined
                })
        }
    })
}
export var createConstructor = function ({
     decorators = undefined, modifiers = undefined, parameters = undefined, body = undefined }
    : { decorators: any, modifiers: any, parameters: any, body: undefined }
) {
    return ts.createConstructor(decorators, modifiers, parameters, body);
}
export var createProperty = function ({ decorators = undefined, modifiers = undefined, name = undefined, questionToken = undefined, type = undefined, initializer = undefined }) {
    return ts.createProperty(decorators, modifiers, name, questionToken, type, initializer);
}
export var createMethod = function ({ decorators = undefined, modifiers = undefined, asteriskToken = undefined, name = undefined, questionToken = undefined, typeParameters = undefined, Parameters = undefined, type = undefined, body = undefined }) {
    return ts.createMethod(decorators, modifiers, asteriskToken, name, questionToken, typeParameters, Parameters, type, body);
}
export var createClassElement = function ({ }) {
    debugger
}
export var createClass = function ({ decorators, name, modifiers, typeParameters = undefined, heritageClauses = undefined, members = undefined }) {
    debugger
    return ts.createClassDeclaration(
        decorators,
        modifiers,
        name,
        typeParameters /*[ts.createTypeParameterDeclaration("testParameter", )]*/,
        heritageClauses,
        members
    );
}