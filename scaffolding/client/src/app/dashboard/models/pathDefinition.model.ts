import { PathDefinition } from "../../../interfaces/app";

export class Path implements PathDefinition {
    path: string;
    size: number;
    isDirectory: boolean;
    dir: string;
    directories: string[];
    base: string;
    fileExt: string;
    fileName: string;
    depth: number;

    constructor({ path = "", size = 0, isDirectory = null, dir = "", directories = [], base = "", fileExt = "", fileName = "", depth = 0 }) {
        this.path = path;
        this.size = size;
        this.isDirectory = isDirectory;
        this.dir = dir;
        this.directories = directories;
        this.base = base;
        this.fileExt = fileExt;
        this.fileName = fileName;
        this.depth = depth;
    }

    update(data) {
        for (var key in this)
            if (this.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
    }
}