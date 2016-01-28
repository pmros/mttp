require! {
  gulp
  \gulp-livescript : livescript
  \gulp-jasmine : jasmine
  'gulp-chmod': chmod
  'gulp-rename': rename
  \jasmine-spec-reporter : SpecReporter
}

test-files = <[ ./test/**/*.js ]>
src-test-ls-files = <[ ./src/test/**/*.ls ]>
src-lib-ls-files = <[ ./src/lib/**/*.ls ]>
src-bin-ls-files = <[ ./src/bin/**/*.ls ]>

gulp.task \src-lib ->
  gulp.src src-lib-ls-files
    .pipe livescript!
    .pipe gulp.dest './lib'

gulp.task \src-bin ->
  gulp.src src-bin-ls-files
    .pipe livescript!
    .pipe chmod 755
    .pipe rename extname: ''    
    .pipe gulp.dest './bin'

gulp.task \src-test ->
  gulp.src <[ ./src/test/{input,output} ]>
    .pipe gulp.dest './test'
  gulp.src src-test-ls-files
    .pipe livescript!
    .pipe gulp.dest './test'

gulp.task \jasmine <[ build ]> ->
  gulp.src test-files
    .pipe jasmine do
      reporter: new Spec-reporter

gulp.task \watch ->
  gulp.watch src-lib-ls-files, <[ src-lib ]>
  gulp.watch src-bin-ls-files, <[ src-bin ]>
  gulp.watch src-test-ls-files, <[ src-test ]>

gulp.task \build <[ src-lib src-bin src-test ]>

gulp.task \default <[ build ]>
