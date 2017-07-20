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
exports.createParameter = function (_a) {
    var _b = _a.decorators, decorators = _b === void 0 ? undefined : _b, _c = _a.modifiers, modifiers = _c === void 0 ? undefined : _c, _d = _a.dotDotDotToken, dotDotDotToken = _d === void 0 ? undefined : _d, _e = _a.name, name = _e === void 0 ? undefined : _e, _f = _a.questionToken, questionToken = _f === void 0 ? undefined : _f, _g = _a.type, type = _g === void 0 ? undefined : _g, _h = _a.initializer, initializer = _h === void 0 ? undefined : _h;
    return ts.createParameter(decorators, modifiers, dotDotDotToken, name, questionToken, type, initializer);
};
exports.createClassElements = function (members) {
    return members.map(function (member) {
        switch (member.kind) {
            case ts.SyntaxKind.Constructor:
                debugger;
                return exports.createConstructor({
                    decorators: undefined,
                    modifiers: undefined,
                    parameters: member.parameters.map(function (param) { return exports.createParameter({
                        decorators: undefined,
                        modifiers: undefined,
                        dotDotDotToken: undefined,
                        name: param.name.text,
                        type: ts.createKeywordTypeNode(param.type.kind)
                    }); }),
                    body: undefined
                });
            case ts.SyntaxKind.PropertyDeclaration:
                return exports.createProperty({
                    decorators: undefined,
                    modifiers: undefined,
                    name: undefined,
                    questionToken: undefined,
                    type: undefined,
                    initializer: undefined
                });
            case ts.SyntaxKind.MethodDeclaration:
                return exports.createMethod({
                    decorators: undefined,
                    modifiers: undefined,
                    asteriskToken: undefined,
                    name: undefined,
                    questionToken: undefined,
                    typeParameters: undefined,
                    Parameters: undefined,
                    type: undefined,
                    body: undefined
                });
        }
    });
};
exports.createConstructor = function (_a) {
    var _b = _a.decorators, decorators = _b === void 0 ? undefined : _b, _c = _a.modifiers, modifiers = _c === void 0 ? undefined : _c, _d = _a.parameters, parameters = _d === void 0 ? undefined : _d, _e = _a.body, body = _e === void 0 ? undefined : _e;
    return ts.createConstructor(decorators, modifiers, parameters, body);
};
exports.createProperty = function (_a) {
    var _b = _a.decorators, decorators = _b === void 0 ? undefined : _b, _c = _a.modifiers, modifiers = _c === void 0 ? undefined : _c, _d = _a.name, name = _d === void 0 ? undefined : _d, _e = _a.questionToken, questionToken = _e === void 0 ? undefined : _e, _f = _a.type, type = _f === void 0 ? undefined : _f, _g = _a.initializer, initializer = _g === void 0 ? undefined : _g;
    return ts.createProperty(decorators, modifiers, name, questionToken, type, initializer);
};
exports.createMethod = function (_a) {
    var _b = _a.decorators, decorators = _b === void 0 ? undefined : _b, _c = _a.modifiers, modifiers = _c === void 0 ? undefined : _c, _d = _a.asteriskToken, asteriskToken = _d === void 0 ? undefined : _d, _e = _a.name, name = _e === void 0 ? undefined : _e, _f = _a.questionToken, questionToken = _f === void 0 ? undefined : _f, _g = _a.typeParameters, typeParameters = _g === void 0 ? undefined : _g, _h = _a.Parameters, Parameters = _h === void 0 ? undefined : _h, _j = _a.type, type = _j === void 0 ? undefined : _j, _k = _a.body, body = _k === void 0 ? undefined : _k;
    return ts.createMethod(decorators, modifiers, asteriskToken, name, questionToken, typeParameters, Parameters, type, body);
};
exports.createClassElement = function (_a) {
    debugger;
};
exports.createClass = function (_a) {
    var decorators = _a.decorators, name = _a.name, modifiers = _a.modifiers, _b = _a.typeParameters, typeParameters = _b === void 0 ? undefined : _b, _c = _a.heritageClauses, heritageClauses = _c === void 0 ? undefined : _c, _d = _a.members, members = _d === void 0 ? undefined : _d;
    debugger;
    return ts.createClassDeclaration(decorators, modifiers, name, typeParameters /*[ts.createTypeParameterDeclaration("testParameter", )]*/, heritageClauses, members);
};
