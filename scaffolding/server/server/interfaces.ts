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
    decorators: any[]
}
export interface Parameter extends Node {

}
export interface TextRange { }
export interface Constructor extends Node {
    parameters: Parameter[];
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
export interface Expression extends Node {
    // kind: ts.SyntaxKind,
    // flags: ts.NodeFlags,
    // expression: {
    //     text: string,
    //     arguments: any
    // }

}
export interface ArrayLiteralExpression extends Expression {
    kind: ts.SyntaxKind;
    flags: ts.NodeFlags;
    // multiLine: boolean;
    elements: Expression[];
}
export interface Identifier extends Node {
    text: string
}
export interface Decorator extends Node {
    expression: Expression;
}
export interface Modifier {
    decorators: ts.Modifier;
}
export interface MethodDecleration extends Node {
    name: Name;
    parameters: Parameter[],
    decorators: Decorator[]
}
