const fs = require('fs');
const Path = require('path');
const ejs = require('ejs');
const Rx = require('rx');
const RxNode = require('rx-node');
const DotEngine = require('@compodoc/ngd-transformer').DotEngine;
const Compiler = require('@compodoc/ngd-compiler').Compiler;
const helper = {};


helper.walkSync = function (dir, filelist) {
    var files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist = helper.walkSync(dir + file + '\\', filelist);
        }
        else {
            filelist.push(dir + file);
        }
    });
    return filelist;
};

helper.getStructure = function ({ rootPath }) {
    let res = [];
    var addComponentToRelativeModule = function (component) {
        pathParts = component.path.split('/').reverse();
        var parentModule = res
            .filter(module => component.path.includes(module.path))
            .reduce((i, s) => {
                if (i.path.length > s.path.length)
                    return i
                else
                    return s
            }, { path: '', components: [] });
        // if(!parentModule.components) debugger
        parentModule.components.push(component)
    }

    return new Promise((resolve, reject) => {

        helper
            .getModulesByFolder(rootPath)
            .then(modules => {
                res = modules;
                modulesPath = modules.map(i => i.path);

                var com = modules.map(moduleItem => {
                    return helper.getComponentssByFolder(moduleItem.path)
                        .then(components => {
                            components.forEach(component => {
                                return addComponentToRelativeModule(component);
                            });
                        })
                })
                Promise.all(com).then(values => {
                    //#region remove duplicated components
                    res.forEach(moduleItem => {
                        var temp = [];
                        moduleItem.components = moduleItem.components.filter(item => {
                            if (temp.indexOf(item.path) > -1) {
                                return false;
                            } else {
                                temp.push(item.path);
                                return true;
                            }
                        })

                    })
                    //#endregion 
                    let parentIsFind, parentModule = "", i = j = 0;
                    res.sort((a, b) => {
                        if (a.path.split('\\').length < b.path.split('\\').length)
                            return 1;
                        else if (a.path.split('\\').length > b.path.split('\\').length)
                            return -1;
                        else return 0;
                    })
                    i = 0
                    while (res.length > 1) {
                        // parentIsFind = true;
                        j = -1;
                        parentModule = { path: "" };
                        while (++j < res.length) {
                            if (res[i].path.includes(res[j].path) && i != j) {
                                parentModule = (parentModule.path.length > res[j].path.length)
                                    ? parentModule
                                    : res[j];
                            }
                            // parentIsFind = false;
                        }
                        if (parentModule.name) {
                            parentModule.modules.push(res[i]);
                            res[i].children = res[i].modules.concat(res[i].components);
                            parentModule.children = parentModule.modules.concat(parentModule.components);
                            res.splice(i, 1);
                        }
                    }

                    resolve(res);
                })
            });
    })
}

helper.getModulesByFolder = function (path, next) {
    return new Promise((resolve, reject) => {

        var files = helper.walkSync(path, [])
            .filter(i => i.endsWith('.module.ts'))
            .map(i => {
                var paths = i.split('\\');
                var name = paths.pop().split('.').shift();
                paths.push('');
                return {
                    type: "module",
                    name: name,
                    path: paths.join('\\'),
                    components: [],
                    modules: [],
                    dependencies: []
                };
            });

        resolve(files);
    })
}

helper.getComponentssByFolder = function (path, next) {
    return new Promise((resolve, reject) => {
        var _files = helper.walkSync(path, []);
        var files = helper.walkSync(path, [])
            .filter(i => i.endsWith('.component.ts'))
            .map(i => {
                var paths = i.split('\\');
                var name = paths.pop().split('.').shift();
                paths.push('');

                return {
                    type: "component",
                    name: name,
                    path: paths.join('\\'),
                    exports: null
                };
            });

        resolve(files);
    })
}

helper.PascalCase = function (str) {
    return str[0].toUpperCase() + str.substr(1);
}

helper.pathDetail = function ({ path }) {
    var res = {
        path,
        size: "",
        isDirectory: null,
        dir: "",
        directories: [],
        base: "",
        fileExt: "",
        fileName: "",
        depth: 0
    }

    var pathState = fs.statSync(path);
    res.isDirectory = pathState.isDirectory();
    res.size = pathState.size;

    var parsedPath = Path.parse(path);
    res.dir = parsedPath.dir.split('\\').pop();
    res.fileExt = parsedPath.ext;
    res.fileName = parsedPath.name;
    res.base = parsedPath.base;
    res.directories = parsedPath.dir.split("\\");

    if (!res.isDirectory) {
    }

    var parts = path.split('\\');

    //depth
    for (let i = parts.length; i > 0; i--)
        if (parts[i] != 'src') res.depth++
        else break;

    return Promise.resolve(res);
}

helper.generateComponent = function (params, next) {
    params.name = helper.PascalCase(params.name);
    var folderPath = params.path + "\\" + params.name + "\\";
    var pathDetail = helper.pathDetail({ path: params.path });
    var templateFolderPath = 'templates/component';
    if (!fs.existsSync(folderPath.toLowerCase())) {
        fs.mkdirSync(folderPath.toLowerCase());
    }

    var values = {
        name: params.name,
        pathDetail
    };

    fs.readdirSync(templateFolderPath).forEach(templateFilepath => {
        let fileName = helper.createFileNameAccordingTemplateFileName({ params, templateFilepath });
        let filePath = folderPath + fileName;
        let templateFileContent = fs.readFileSync(templateFolderPath + "//" + templateFilepath);
        let renderedFileContent = ejs.render(templateFileContent.toString(), values);
        fs.writeFile(filePath.toLowerCase(), renderedFileContent, (err) => {
            if (err) throw err;
            console.log("The component file was succesfully saved!");
        });
    });

    next({});
}

helper.createFileNameAccordingTemplateFileName = function ({ params, templateFilepath }) {
    var parts = templateFilepath.split('.');
    parts.pop();
    return parts.map(i => {
        if (!i.startsWith('$')) return i;
        var paramName = i.substr(1);
        if (paramName in params)
            return params[paramName];
    }).join('.')
}

helper.generateModule = function (params, next) {

    params.name = helper.PascalCase(params.name)
    var folderPath = params.path + "\\" + params.name + "\\";
    var pathDetail = helper.pathDetail({ path: params.path });
    var templateFolderPath = 'templates/module';
    if (!fs.existsSync(folderPath.toLowerCase())) {
        fs.mkdirSync(folderPath.toLowerCase());
    }

    var values = {
        name: params.name,
        pathDetail
    };

    fs.readdirSync(templateFolderPath).forEach(templateFilepath => {

        // let fileName = helper.createFileNameAccordingTemplateFileName({ params, templateFilepath });
        // let filePath = folderPath + fileName.toLowerCase();
        // let templateFileContent = fs.readFileSync(templateFolderPath + "//" + templateFilepath);
        // let renderedFileContent = ejs.render(templateFileContent.toString(), values);
        // fs.writeFile(filePath.toLowerCase(), renderedFileContent, (err) => {
        //     if (err) throw err;
        //     console.log("The module file was succesfully saved!");
        // });
    });

    next({});
    // var templateFilepath = "templates/module.ts.template";
}

helper.getModuleDependencies = function ({ path }) {
    return new Promise((resolve, reject) => {

        const compiler = new Compiler([path], {
            tsconfigDirectory: './'
        });
        const deps = compiler.getDependencies();
        // var xx = compiler.getSourceFileDecorators(path, [])
        resolve(deps[0]);
        // const engine = new DotEngine({
        //     output: './zzz',
        //     // displayLegend: program.displayLegend,
        //     outputFormats: 'json'
        // });
        // engine.generateHTML()
        // engine.generateGraph(deps)
        // engine.generateJSON(deps)
    })
}

helper.getComponent = function ({ path }) {
    res = {
        name: "",
        path: {},
        type: "",
        dependencies: {},

    }

    const promises = [];

    promises.push(
        helper
            .getModuleDependencies({ path })
            .then(data => res.dependencies = data)
    );
    promises.push(
        helper
            .pathDetail({ path })
            .then(data => {
                res.path = data;
                res.type = (data.directories.some(i => i == "smart-components")) ? "smart" : "dumb";
            })
    );

    return Promise.all(promises)
        .then(data => res);

}

helper.getModule = function ({ path }) {
    res = {
        name: "",
        path: {},
        moduleSize: 0,
        dependencies: {},

    }

    const promises = [];

    promises.push(
        helper
            .getModuleDependencies({ path })
            .then(data => res.dependencies = data)
    );
    promises.push(
        helper
            .pathDetail({ path })
            .then(data => {
                res.path = data;
            })
    );

    // var parts = path.split('\\');
    // parts.pop();
    // var folderPath = parts.join('\\');

    // promises.push(
    //     helper
    //         .pathDetail({ path:folderPath })
    //         .then(data => {
    //             res.path = data;
    //         })
    // );

    return Promise.all(promises)
        .then(data => res);

}

module.exports = helper;




 var ts = require("typescript");



// let source = "A:\\git\\@ng2plus\\scaffolding\\client\\src\\app\\shared\\shared.module.ts";
// source = source.toString()
// // const source = "let x: string  = 'string'";
// // let result = ts.transpileModule(templateFileContent, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
// let result = ts.getModuleDependencies();
// debugger

// console.log(JSON.stringify(result));



require('./create')
require('./type checker')