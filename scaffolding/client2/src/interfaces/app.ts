export interface PathDefinition {
    path: string;
    size: number;
    isDirectory: boolean;
    dir: string;
    directories: string[];
    base: string;
    fileExt: string;
    fileName: string;
    depth: number;
}
export interface componentFile {
    name: string;
    path: PathDefinition;
    type: string;
    exported: boolean;
    components: componentFile[];
}
export interface dependency {
    module: componentFile;
    export: boolean;
    params: any[];
}
export interface providerDefinition {

}
export interface moduleFile {
    name: string;
    path: string;
    components: componentFile[];
    modules: moduleFile[];
    imports: moduleFile[];
    exports: moduleFile[];
    declerations: componentFile[];
    providers: providerDefinition[];
}