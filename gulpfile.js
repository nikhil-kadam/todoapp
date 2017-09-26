var gulp = require('gulp'),
   uglify = require('gulp-uglify'),
   concat = require('gulp-concat');


gulp.task('build', function() {
  return gulp.src([
        "./config/config.js",
        "./app/app.js",
        "./app/modules/registration/route.js",
        "./app/modules/registration/controllers/registration.js",
        "./app/services/registration/registrationService.js",
        "./app/modules/login/route.js",
        "./app/modules/login/controllers/login.js",
        "./app/services/login/loginService.js",
        "./app/modules/dashboard/route.js",
        "./app/modules/dashboard/controllers/home.js",
        "./app/modules/dashboard/controllers/edit.js",
        "./app/services/dashboard/editService.js",
        "./app/modules/todo/route.js",
        "./app/modules/todo/controllers/todo.js",
        "./app/services/todo/todoService.js",
        "./app/filters/todo/todoFilter.js",
        "./app/directives/navbar/navbarDirective.js",
        "./app/directives/search/searchDirective.js",
        "./app/directives/fileupload/fileUploadDirective.js"
    ])
    .pipe(concat("app.js"))
    .pipe(gulp.dest('gulp'))
});
