import * as ts from "typescript";
import * as fs from "fs";
import * as I from "./interfaces";
import * as IC from "./Create.Interface";
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
export var createDecorators: IC.CreateDecorators = function ({ decorators }) {
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
export var createParameter: IC.CreateParameter = params => ts.createParameter(
    createDecorators(params),
    params.modifiers,
    params.dotDotDotToken,
    params.name.text,
    params.questionToken,
    ts.createKeywordTypeNode((params.type as ts.KeywordTypeNode).kind),
    params.initializer
);

export var createClassElements = function (params: { members: I.ClassElement[] }) {
    return params.members.map(member => {
        switch (member.kind) {
            case ts.SyntaxKind.Constructor:
                debugger
                return createConstructor({
                    decorators: undefined,
                    modifiers: undefined,
                    parameters: (<I.Constructor>member).parameters.map(param => createParameter(<I.ParameterDecleration>param)),
                    body: undefined,
                });
            case ts.SyntaxKind.PropertyDeclaration:
                return createProperty(<I.PropertyDecleration>member)
            case ts.SyntaxKind.MethodDeclaration:
                return createMethod(<I.MethodDeclaration>member)
        }
    })
}
export var createConstructor = function ({
     decorators = undefined, modifiers = undefined, parameters = undefined, body = undefined }
    : { decorators: any, modifiers: any, parameters: any, body: undefined }
) {
    return ts.createConstructor(decorators, modifiers, parameters, body);
}
export var createProperty: IC.CreateProperty = params => {
    return ts.createProperty(
    createDecorators(params),
    params.modifiers,
    params.name.text,
    (params.questionToken) ?  ts.createToken(params.questionToken) : undefined,
    params.type,
    createExpression(params.initializer)
)};
export var createExpression: IC.createExpression = node => {
    switch (node.kind) {
        case ts.SyntaxKind.NumericLiteral:
            return ts.createNumericLiteral((<I.NumericLiteralDecleration>node).text)

        default:
            debugger;
    }
}
export var createMethod: IC.CreateMethod = params => ts.createMethod(
    createDecorators(params),
    params.modifiers,
    params.asteriskToken,
    params.name.text,
    params.questionToken,
    params.typeParameters,
    params.parameters.map(param => createParameter(<I.ParameterDecleration>param)),
    params.type,
    params.body
);
export var createClassElement = function ({ }) {
    debugger
}

export var createClass: IC.CreateClass = params => ts.createClassDeclaration(
    createDecorators(params),
    params.modifiers,
    params.name,
    params.typeParameters /*[ts.createTypeParameterDeclaration("testParameter", )]*/,
    params.heritageClauses,
    createClassElements(params)
);
