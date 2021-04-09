const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const babel = require("gulp-babel");

gulp.task("copyHtml", done => {
    gulp.src("*.html").pipe(gulp.dest("dist")).pipe(connect.reload());
    done();
});
gulp.task("copySass", done => {
    gulp.src("sass/*.scss").pipe(sourcemaps.init()).pipe(sass()).pipe(sourcemaps.write()).pipe(gulp.dest("dist/css")).pipe(connect.reload());
    done();
});
gulp.task("copyJs", done => {
    gulp.src("js/*.js").pipe(gulp.dest("dist/js")).pipe(connect.reload());
    done();
});
gulp.task("copyImg", done => {
    gulp.src("img/*.{jpg,png,gif}").pipe(gulp.dest("dist/img")).pipe(connect.reload());
    done();
});

gulp.task("watch", done => {
    gulp.src("*.html", gulp.series("copyHtml"));
    gulp.src("sass/*.scss", gulp.series("copySass"));
    gulp.src("js/*.js", gulp.series("copyJs"));
    gulp.src("img/*.{jpg,png,gif}", gulp.series("copyImg"));
    done();
});
gulp.task("server", done => {
    connect.server({
        root: "dist",
        livereload: true
    });
    done();
});

gulp.task("build", gulp.series("copyHtml", "copySass", "copyJs", "copyImg"));
gulp.task("default", gulp.series("build", "server", "watch"));