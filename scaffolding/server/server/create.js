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
exports.createParameter = function (params) { return ts.createParameter(exports.createDecorators(params), params.modifiers, params.dotDotDotToken, params.name.text, params.questionToken, ts.createKeywordTypeNode(params.type.kind), params.initializer); };
exports.createClassElements = function (params) {
    return params.members.map(function (member) {
        switch (member.kind) {
            case ts.SyntaxKind.Constructor:
                debugger;
                return exports.createConstructor({
                    decorators: undefined,
                    modifiers: undefined,
                    parameters: member.parameters.map(function (param) { return exports.createParameter(param); }),
                    body: undefined
                });
            case ts.SyntaxKind.PropertyDeclaration:
                return exports.createProperty(member);
            case ts.SyntaxKind.MethodDeclaration:
                return exports.createMethod(member);
        }
    });
};
exports.createConstructor = function (_a) {
    var _b = _a.decorators, decorators = _b === void 0 ? undefined : _b, _c = _a.modifiers, modifiers = _c === void 0 ? undefined : _c, _d = _a.parameters, parameters = _d === void 0 ? undefined : _d, _e = _a.body, body = _e === void 0 ? undefined : _e;
    return ts.createConstructor(decorators, modifiers, parameters, body);
};
exports.createProperty = function (params) {
    return ts.createProperty(exports.createDecorators(params), params.modifiers, params.name.text, (params.questionToken) ? ts.createToken(params.questionToken) : undefined, params.type, exports.createExpression(params.initializer));
};
exports.createExpression = function (node) {
    switch (node.kind) {
        case ts.SyntaxKind.NumericLiteral:
            return ts.createNumericLiteral(node.text);
        default:
            debugger;
    }
};
exports.createMethod = function (params) { return ts.createMethod(exports.createDecorators(params), params.modifiers, params.asteriskToken, params.name.text, params.questionToken, params.typeParameters, params.parameters.map(function (param) { return exports.createParameter(param); }), params.type, params.body); };
exports.createClassElement = function (_a) {
    debugger;
};
exports.createClass = function (params) { return ts.createClassDeclaration(exports.createDecorators(params), params.modifiers, params.name, params.typeParameters /*[ts.createTypeParameterDeclaration("testParameter", )]*/, params.heritageClauses, exports.createClassElements(params)); };
