/*
 * EJA: updated gulpfile.babel.js to support SASS, watch
 *
 * broswerify adds module support (linking of external files)
 * babelify is an add-on to browserify
 * to specifically add the es6 import command (comparable to Requre)
 * babelify uses babel to transpile the ES6 code to ES5 code
 *
 * https://babeljs.io/
 * http://browserify.org/
 * https://github.com/babel/babelify
 * https://www.npmjs.com/package/babelify
 * */

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";




let es6Fn = () => {
    console.log("gulp: es6Fn() - transpiling...")
    return browserify("src/js/app.js")
        .transform("babelify")
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist/js"));

};

let defaultTaskFn = () => {
    console.log("gulp: default() task ");
};

let watchFn = () => {
    gulp.watch('src/js/**/*.js', ['es6']);
};

gulp.task("es6", es6Fn);
gulp.task("default", defaultTaskFn);
gulp.task("watch",['es6'],watchFn);


