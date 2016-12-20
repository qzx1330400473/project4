//首先引入gulp模块
var gulp=require('gulp');
//引入gulp-stylus插件
var stylus=require('gulp-stylus');
var minifycss=require('gulp-minify-css');
var uglify=require('gulp-uglify');
var nodemon=require('gulp-nodemon');
var browserSync=require('browser-sync').create();

var reload=browserSync.reload;

gulp.task('nodemon',function(ab){
    var ft=false;
    return nodemon({
        script:'./app.js'
    }).on('start',function(){
        if (!ft){
            ab();
            ft = true;
        }
    })
});

gulp.task('browaerSync',['nodemon'],function(){
    browserSync.init({
        proxy:{
            target:'http://127.0.0.1:9999'
        },
        files:['*'],
        port:9888,
        open:false
    })
});

//创建一个编译stylus的任务
gulp.task('stylus',function(){
    //获取要编译的文件
    //指定一个文件
    //gulp.src('./stylus/index.styl')
    //指定多个文件
    //gulp.src(['./stylus/index.styl','./stylus/css.styl'])
    //指定一个目录下所有（不包含子目录）
    //gulp.src('.stylus/*.styl')
    //指定一个目录及所有子目录下的文件
    return gulp.src('./stylus/**/*.styl')
        //执行stylus编译
        .pipe(stylus())
        //输出编译后的文件
        .pipe(gulp.dest('./public/css'))
});


//压缩css文件
gulp.task('minify',function(){
    return gulp.src('./public/css/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public/minicss'))
});



//压缩js文件
gulp.task('uglify',function(){
   return gulp.src('./public/js/**/*.js')
       .pipe(uglify())
       .pipe(gulp.dest('./public/minijs'))
});

gulp.task('watch',['browaerSync','stylus','uglify'],function(){
    gulp.watch('./stylus/**/*.styl',['stylus']);
    gulp.watch('.stylus/js/**/*.js',['uglify']);
    gulp.watch(['./stylus/**/*.styl','.stylus/js/**/*.js']).on('change',function(){
        reload();
    });
});

gulp.task('es6',function(){
    console.log('this is es6')
});

gulp.task('css',function(){
    console.log('this is css')
});

//限制性es6，执行完再执行minijs
gulp.task('minijs',['es6'],function(){
    console.log('this is minijs')
});

//创建一个执行其他任务的任务
gulp.task('all',['logs','es6','css','minijs'],function(){
    console.log('this is all')
});

//创建一个default任务
gulp.task('default',function(){
    console.log('this default')
});