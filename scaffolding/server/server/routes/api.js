const express = require('express');
const fs = require('fs');
const http = require('http');
const ejs = require('ejs');
const Rx = require('rx');
const RxNode = require('rx-node');
const DotEngine = require('@compodoc/ngd-transformer').DotEngine;
const Compiler = require('@compodoc/ngd-compiler').Compiler;

const helper = require('../helper');

const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

router.get('/structure', (req, res) => {
    helper
        .getStructure({
            rootPath: req.query.root
        })
        .then(data => {
            res.send({ data });
        })
        .catch(error => {
            debugger;
            console.log(error)
        });
});

router.post('/component', (req, res) => {
    helper.generateComponent({
        path: req.body.path,
        name: req.body.name
    }, data => {
        res.send(data);
    });
});

router.post('/module', (req, res) => {
    helper.generateModule({
        path: req.body.path,
        name: req.body.name
    }, data => {
        res.send(data);
    });
});

router.get('/files', (req, res) => {
    var files = helper.walkSync(req.query.root, [])
        .filter(i => i.endsWith('.ts'))
        .filter(i => !i.endsWith('.spec.ts'))
        .filter(i => !i.endsWith('.d.ts'))
        .filter(i => !i.endsWith('/index.ts'));
    res.jsonp({ data: files });
});

router.get('/modules', (req, res) => {
    helper
        .getModulesByFolder(req.query.root)
        .then(data => {
            res.jsonp({ data: data });
        })
});

router.get('/moduleDependencies', (req, res) => {
    helper
        .getModuleDependencies(req.query)
        .then(data => {
            res.jsonp({ data });
        })
});
router.get('/component', (req, res) => {
    helper
        .getComponent(req.query)
        .then(data => {
            res.jsonp({ data });
        })
});

router.get('/module', (req, res) => {
    helper
        .getModule(req.query)
        .then(data => {
            res.jsonp({ data });
        })
});








// const compiler = new Compiler(['./src/app/a.b.ts'], {
//   tsconfigDirectory: './'
// });

// var files = helper.walkSync("./src/app/", [])
//     .filter(i => i.endsWith('.ts') && !i.endsWith('.spec.ts') && !i.endsWith('.d.ts') && !i.endsWith('/index.ts'));

// const compiler = new Compiler(files, {
//     tsconfigDirectory: './'
// });

// const deps = compiler.getDependencies();
// // var xx = compiler.isModule();
// const engine = new DotEngine({
//     output: './zzz',
//     // displayLegend: program.displayLegend,
//     outputFormats: 'json'
// });
// engine.generateHTML()
// engine.generateGraph(deps)
// engine.generateJSON(deps)




module.exports = router;