var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpSequence = require('gulp-sequence');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var htmlminify = require('gulp-html-minify');
var less = require('gulp-less');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var changed = require('gulp-changed');
var copy = require('gulp-copy');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var inject = require('gulp-inject');
var es = require('event-stream');

//============================================================
var pathDev = {
    root: '',
    images: 'images/*',
    less: 'styles/',
    html: 'index.html',
    video: 'videos/*'
};

var scriptsSource = [
    pathDev.root + 'scripts/jquery.min.js',
    pathDev.root + 'scripts/TweenMax.js',
    pathDev.root + 'scripts/iscroll.js',
    pathDev.root + 'scripts/swiper.min.js',
    pathDev.root + 'scripts/common.js',
    pathDev.root + 'scripts/app.js',
];
var lessSource = ['styles/*.less'];
var mainLess = pathDev.root + 'styles/style.less';

var pathDest = {
    root: 'dist',
    styles: 'dist/styles',
    scripts: 'dist/scripts',
    images: 'dist/images',
    html: 'dist/index.html',
    video: 'dist/videos'
}

//=================================================================
gulp.task('default', (cb) => {
    // place code for your default task here
    gulpSequence(['bulid'])(cb);
});

gulp.task('bulid', (cb) => {
    // gulpSequence(['less'], ['js'], ['html'])(cb);
    gulpSequence(['images'], ['html'], ['copy:EB'], ['copy:video'])(cb);

    browserSync({
        notify: true,
        open: true,
        port: 10086,
        ui: false,
        server: {
            baseDir: ['dist']
        }
    });

    gulp.watch([
        pathDev.html,
        lessSource,
        scriptsSource
    ], ['html']).on('change', () => {
        setTimeout(reload, 200);
    });

    gulp.watch([pathDev.images], ['change:images']).on('change', () => {
        setTimeout(reload, 200);
    });

});

gulp.task('less', ['clean:styles'], () => {
    return cssWrap()
        .pipe(gulp.dest(pathDest.styles));
});

gulp.task('scripts', ['clean:scripts'], () => {
    return scriptsWrap()
        .pipe(gulp.dest(pathDest.scripts))
});

gulp.task('html', ['clean:html'], () => {
    return gulp.src(pathDev.html)
        .pipe(inject(scriptsWrap(), {
            starttag: '<!-- inject:js -->',
            transform: function(filePath, file) {
                // return file contents as string
                return '<script>' + file.contents.toString('utf8') + '</script>'
            }
        }))
        .pipe(inject(cssWrap(), {
            starttag: '<!-- inject:css -->',
            transform: function(filePath, file) {
                // return file contents as string
                return '<style>' + file.contents.toString('utf8') + '</style>'
            }
        }))
        .pipe(htmlminify({
            loose: true
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(pathDest.root))
});

gulp.task('images', ['clean:images'], () => {
    return gulp.src([pathDev.images])
        .pipe(copy(pathDest.images, {
            prefix: 2
        }));
});

gulp.task('copy:EB', () => {
    return gulp.src(['scripts/EBLoader.js'])
        .pipe(copy('dist/scripts', {
            prefix: 1
        }));
});

gulp.task('copy:video', () => {
    return gulp.src([pathDev.video])
        .pipe(copy(pathDest.video, {
            prefix: 1
        }));
});

gulp.task('change:images', () => {
    return gulp.src(pathDev.images)
        .pipe(changed(pathDev.images))
        .pipe(gulp.dest(pathDest.images));
});

gulp.task('clean:dist', (cb) => {
    return gulp.src(pathDest.root)
        .pipe(clean());
});

gulp.task('clean:styles', () => {
    return gulp.src(pathDest.styles, {
            read: false
        })
        .pipe(clean());
});

gulp.task('clean:scripts', () => {
    return gulp.src(pathDest.scripts, {
            read: false
        })
        .pipe(clean());
});

gulp.task('clean:html', () => {
    return gulp.src(pathDest.html, {
            read: false
        })
        .pipe(clean());
});

gulp.task('clean:images', () => {
    return gulp.src(pathDest.images, {
            read: false
        })
        .pipe(clean());
});

function scriptsWrap() {
    return gulp.src(scriptsSource).
    pipe(concat('app.js')).
    pipe(uglify());
}

function cssWrap() {
    return gulp.src([mainLess])
        .pipe(less({
            paths: [path.join(__dirname, 'styles')]
        }))
        .pipe(minifyCss({
            compatibility: 'ie9'
        }))
        .pipe(rename('style.css'));
}
