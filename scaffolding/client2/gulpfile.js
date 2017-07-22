var gulp = require("gulp"),
     typedoc = require("gulp-typedoc");

gulp.task("typedoc", function () {
var srcTSFiles= ["./src/**/*.ts"];

return gulp
    .src(srcTSFiles)
    .pipe(typedoc({
        // TypeScript options (see typescript docs) 
        module: "commonjs",
        target: "ES5",
        includeDeclarations: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,

        // Output options (see typedoc docs) 
        out: "documentation",
        json: "documentation.json",

        // TypeDoc options (see typedoc docs) 
        name: "my angular",
        version: true,
        noLib: true
    }));
  });