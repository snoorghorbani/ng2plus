import { moduleFile, componentFile, providerDefinition, PathDefinition } from "../../../interfaces/app";
import { Path } from "."


export class ComponentDefinition implements componentFile {
    name: string = "";
    path: Path;
    type: string;
    components: componentFile[] = [];
    exported: boolean = false;

    constructor({ name = "", path = "", type = "", components = [], exported = false }) {
        this.name = name;
        this.path = new Path({ path });
        this.type = type;
        this.components = components.map(i => new ComponentDefinition(i));
        this.exported = exported;
    }

    update(data) {
        for (var key in this)
            if (this.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
    }
}