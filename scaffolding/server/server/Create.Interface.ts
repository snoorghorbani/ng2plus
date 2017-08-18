import * as ts from "typescript";
import * as fs from "fs";
import * as I from "./interfaces";

export interface CreateClass {
    // (params: { decorators: I.Decorator[], name: string, modifiers: any, typeParameters: any, heritageClauses: any, members: I.ClassElement[] })
    (params: I.Class): ts.ClassDeclaration;
}

export interface CreateDecorators {
    (params: { decorators: I.Decorator[] }): ts.Decorator[]
}

export interface CreateMethod {
    (params: I.MethodDeclaration): ts.MethodDeclaration
}

export interface CreateParameter {
    (params: I.ParameterDecleration): ts.ParameterDeclaration
}
export interface CreateParameters {
    (params: I.ParameterDecleration[]): ts.ParameterDeclaration[]
}

export interface CreateProperty {
    (params: I.PropertyDecleration): ts.PropertyDeclaration
}
export interface createExpression {
    (node: I.Expression): ts.Expression
}
export interface createConstructor {
    (params: I.ConstructorDeclaration): ts.ConstructorDeclaration
}

