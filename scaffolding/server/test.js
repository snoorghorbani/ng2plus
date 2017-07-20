// // import * as ts from 'typescript';
// // import { cyan, green } from 'chalk';
// var ts = require('typescript');
// var fs = require('fs');
// // existsSync, readFileSync
// var path = require('path');

// // import { dirname } from 'path';

//  const normalizeOptions = (options, configFilePath) => {
//     options.genDir = options.basePath = options.baseUrl;
//     options.configFilePath = configFilePath;
// };

//  const createProgramFromTsConfig = (configFile, overrideFiles) => {
//     // console.log(cyan('📝  Creating a program...'));
//     const projectDirectory = path.dirname(configFile);
//     const { config } = ts.readConfigFile(configFile, ts.sys.readFile);

//     // Any because of different APIs in TypeScript 2.1 and 2.0
//     const parseConfigHost = {
//         fileExists: fs.existsSync,
//         readDirectory: ts.sys.readDirectory,
//         readFile: (file) => fs.readFileSync(file, 'utf8'),
//         useCaseSensitiveFileNames: true,
//     };
//     const parsed = ts.parseJsonConfigFileContent(config, parseConfigHost, projectDirectory);
//     parsed.options.baseUrl = parsed.options.baseUrl || projectDirectory;
//     normalizeOptions(parsed.options, configFile);
//     const host = ts.createCompilerHost(parsed.options, true);
//     const program = ts.createProgram(overrideFiles || parsed.fileNames, parsed.options, host);

//     // console.log(green('✅  Program created!'));

//     return program;
// };

// var zz = createProgramFromTsConfig("A:\\git\\@ng2plus\\scaffolding\\client\\tsconfig.json");
// xx= zz.dropDiagnosticsProducingTypeChecker();
// debugger
