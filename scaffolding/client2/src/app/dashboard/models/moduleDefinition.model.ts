import { moduleFile, componentFile, providerDefinition } from "../../../interfaces/app";
import { ComponentDefinition } from ".";

export class ModuleDefinition implements moduleFile {
    name: string = "";
    path: string = "";
    components: componentFile[] = [];
    modules: moduleFile[] = [];
    imports: moduleFile[] = [];
    exports: moduleFile[] = [];
    declerations: componentFile[] = [];
    providers: providerDefinition[] = [];

    constructor({ name = "", path = "", components = [], modules = [], imports = [], exports = [], declerations = [], providers = [] }) {
        this.name = name;
        this.path = path;
        this.components = components || [];
        this.modules = modules.map(i => new ModuleDefinition(i));
        this.imports = imports.map(i => new ModuleDefinition(i));
        this.exports = exports.map(i => new ModuleDefinition(i));
        this.declerations = exports.map(i => new ComponentDefinition(i));
    }

    update(data) {
        for (var key in this)
            if (this.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
    }
}