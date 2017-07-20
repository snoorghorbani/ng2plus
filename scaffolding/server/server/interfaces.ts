import * as ts from "typescript";

export interface DocEntry {
    name?: string,
    fileName?: string,
    documentation?: string,
    type?: string,
    constructors?: DocEntry[],
    parameters?: DocEntry[],
    returnType?: string
};
export interface extractedImportDecleration {
    moduleSpecifier?: string;
    namedBindings?: ts.NamedImports;
}
export interface visitResult {
    importDeclerations: any[];
    classDecleration: Class
}
export interface importClause extends Node {
    name: string
}
export interface Node {
    kind: ts.SyntaxKind,
    flags: ts.NodeFlags,
}
export interface Token extends Node { }
export interface Import extends Node {
    moduleSpecifier: string,
    importClauses: importClause[]
}
export interface Class extends Node {
    name: string;
    type: string;
    members: Node[];
    constructors: DocEntry[];
    documentation: string;
    decorators: Decorator[]
}
export interface ParameterDecleration extends Node {
    name: Name;
    type: Token;
}
export interface TextRange { }
export type Expression = ObjectLiteralExpression | ArrayLiteralExpression | Identifier | DecoratorExpression | ParameterDecleration;
export interface Constructor extends Node {
    parameters: ParameterDecleration[];
}
export interface Initializer extends Node {
    // multiLine: boolean;
    elements: any[];
}
export interface PropertyDecleration extends Node {
    name: Name,
    initializer: Expression
};
export type Name = {
    text: string
}
export interface NumericLiteralDecleration extends Node {
    text: string
}

export interface ArrayLiteralExpression extends Node {
    elements: Expression[];
}
export interface Identifier extends Node {
    text: string
}
export interface ObjectLiteralExpression extends Node {
    properties: PropertyDecleration[]
}
export interface DecoratorExpression {
    expression: {
        text: string,
        arguments: Expression[];
    }
}
export interface Decorator extends Node {
    expression: Expression;
}
export interface Modifier {
    decorators: ts.Modifier;
}
export interface MethodDeclaration extends Node {
    name: Name;
    parameters: Expression[],
    decorators: Decorator[]
}
export interface KeywordTypeNode extends Node {

}
export type ClassElement = Constructor | PropertyDecleration | MethodDeclaration;