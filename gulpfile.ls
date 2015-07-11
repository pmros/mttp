require! {
  gulp
  \gulp-livescript : livescript
}

src-lib-ls-files = <[ ./src/lib/**/*.ls ]>

gulp.task \src-lib ->
  gulp.src src-lib-ls-files
    .pipe livescript!
    .pipe gulp.dest './lib'

gulp.task \build <[ src-lib ]>

gulp.task \default <[ build ]>
