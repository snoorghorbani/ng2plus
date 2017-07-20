"use strict";
exports.__esModule = true;
var ts = require("typescript");
exports.createImport = function (_a) {
    var importClauses = _a.importClauses, moduleSpecifier = _a.moduleSpecifier;
    // var decorator = ts.createDecorator(ts.createLiteral("decorator"));
    // var importSpecifier = ts.createImportSpecifier(ts.createIdentifier("test1"), ts.createIdentifier("test2"));
    // var namedImportBinding = ts.createNamedImports([importSpecifier]);
    return ts.createImportDeclaration(undefined, undefined, exports.createImportClause(importClauses, undefined), ts.createLiteral(moduleSpecifier));
};
exports.createImportClause = function (importClauses, namedBindings) {
    var identifiers = "{" + importClauses.map(function (i) { return i.name; }).join(",") + "}";
    var importIdentifier = ts.createIdentifier(identifiers);
    return ts.createImportClause(importIdentifier, undefined);
};
exports.createArrayLiteral = function (initializer) {
    return ts.createArrayLiteral(initializer.elements.map(function (i) { return ts.createIdentifier(i.text); }), initializer.multiLine);
};
exports.createIdentifier = function (text) {
    return ts.createIdentifier(text);
};
exports.createObjectLiteral = function (_a) {
    var properties = _a.properties;
    return ts.createObjectLiteral(properties.map(function (property) { return exports.createPropertyAssignment({ property: property }); }));
};
exports.createArguments = function (_a) {
    var expression = _a.expression;
    return expression.arguments.map(function (argumentItem) {
        switch (argumentItem.kind) {
            case ts.SyntaxKind.ObjectLiteralExpression:
                return exports.createObjectLiteral(argumentItem);
        }
        debugger;
    });
};
exports.createPropertyAssignment = function (_a) {
    var property = _a.property;
    return ts.createPropertyAssignment(exports.createIdentifier(property.name.text), exports.createArrayLiteral(property.initializer));
};
exports.createCall = function (_a) {
    var expression = _a.expression, typeArguments = _a.typeArguments, argumentsArray = _a.argumentsArray;
    return ts.createCall(expression, typeArguments, argumentsArray);
};
exports.createDecorators = function (_a) {
    var decorators = _a.decorators;
    return decorators.map(function (decorator) { return exports.createDecorator({ decorator: decorator }); });
};
exports.createDecorator = function (_a) {
    var decorator = _a.decorator;
    return ts.createDecorator(exports.createCall({
        expression: exports.createIdentifier(decorator.expression.expression.text),
        typeArguments: undefined,
        argumentsArray: exports.createArguments(decorator.expression)
    }));
};
exports.createClass = function (_a) {
    var decorators = _a.decorators, name = _a.name, modifiers = _a.modifiers, _b = _a.typeParameters, typeParameters = _b === void 0 ? undefined : _b, _c = _a.heritageClauses, heritageClauses = _c === void 0 ? undefined : _c, _d = _a.members, members = _d === void 0 ? undefined : _d;
    return ts.createClassDeclaration(decorators, modifiers, name, typeParameters /*[ts.createTypeParameterDeclaration("testParameter", )]*/, undefined, undefined);
};
