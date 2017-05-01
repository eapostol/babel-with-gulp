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
import sass from 'gulp-sass';
import browserify from "browserify";
import source from "vinyl-source-stream";
import browserSync from 'browser-sync';

let browserSyncFn = () => {
    console.log('gulp: browserSyncFn() - initializing browserSync');
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    });
};

let es6Fn = () => {
    console.log("gulp: es6Fn() - transpiling...");
    return browserify("src/js/Main.js")
        .transform("babelify")
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist/js"));

};

let sassFn = () =>{
    console.log('gulp: sassFn() - sassifying scss');
    return gulp.src('src/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
};

let indexHTMLFn = () => {
    gulp.src('src/index.html').pipe(gulp.dest('dist'));
};

let imagesFn = () => {
    "use strict";
    gulp.src('src/images').pipe(gulp.dest('dist/images'));
};

let defaultTaskFn = () => {
    console.log("gulp: default() task invoked");
};

let watchFn = () => {
    gulp.watch('src/js/**/*.js', ['es6Task']);
    gulp.watch('src/scss/**/*.scss', ['sassTask']);
    gulp.watch('src/images/**/*.{png,svg,gif,jpg}',['imagesTask'])
    gulp.watch('src/index.html',['indexHTMLTask']);

    // Reloads the browser whenever HTML,CSS or JS Files change
    // gulp.watch('dist/*.html', browserSync.reload);
    // gulp.watch('dist/js/**/*.js', browserSync.reload);
    // gulp.watch('dist/css/**/*.css', browserSync.reload);
    gulp.watch('dist/**/*.*', browserSync.reload);

};

browserSync.create();
let watchTasks = ['browserSyncTask','es6Task','sassTask','imagesTask','indexHTMLTask'];

gulp.task('browserSyncTask', browserSyncFn);
gulp.task("es6Task", es6Fn);
gulp.task("sassTask",sassFn);
gulp.task("indexHTMLTask",indexHTMLFn);
gulp.task("imagesTask",imagesFn);
gulp.task("default", ['watch'], defaultTaskFn);
gulp.task("watch",watchTasks,watchFn);


