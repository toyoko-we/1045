const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

gulp.task("default", function () {
  return gulp.src("src/2.4.2.min.css")
    .pipe(postcss([
      autoprefixer({
        browsers: ["cover 100%"],
        cascade: false
      })
    ]))
    .pipe(gulp.dest("dist"));
});