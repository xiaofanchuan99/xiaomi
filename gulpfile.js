const gulp = require("gulp");
// const minifyCss = require("gulp-minify-css");
//重新命名
const rename = require("gulp-rename");
// //压缩css
// const cleanCss = require("gulp-clean-css");
//本地服务
const connect = require("gulp-connect");
//gulp-concat 合并 减少请求次数
// const concat = require("gulp-concat");
//gulp-sass 浏览器本身不支持sass的语法 把sass转成css
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps")
    //拷贝iconfont
gulp.task("font", done => {
    gulp.src("iconfont/*")
        .pipe(gulp.dest("dist/iconfont"))
        .pipe(connect.reload());
    done()
})




//拷贝img
gulp.task("copyimg", done => {
        gulp.src("images/**/*")
            .pipe(gulp.dest("dist/images"))
            .pipe(connect.reload());

        done()
    })
    //拷贝index.html
gulp.task("copyindexhtml", done => {
    gulp.src("*.html")
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
    done()
})

//拷贝html
gulp.task("copyhtml", done => {
        gulp.src("html/*.html")
            .pipe(gulp.dest("dist/html"))
            .pipe(connect.reload());
        done()
    })
    //拷贝js/
gulp.task("copyjs", done => {
        gulp.src(["*.js", "!gulpfile.js"])
            .pipe(gulp.dest("dist/js"))
            .pipe(connect.reload());

        done()
    })
    // gulp.task("sass", done => {

//     gulp.src("sass/*.scss")
//         .pipe(sourcemaps.init())
//         .pipe(sass({
//             outputStyle: "compressed"
//         }))

//     .pipe(gulp.dest("dist/css"))
//         .pipe(connect.reload());
//     done()
// })
gulp.task("sass", done => {

    gulp.src("sass/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());

    done();
});



//搭建服务器
gulp.task("server", done => {
    connect.server({
        root: "dist",
        livereload: true
    })
    done();
});


//监听
gulp.task("watch", done => {

    gulp.watch("html/*.html", gulp.series("copyhtml"));
    gulp.watch("*.html", gulp.series("copyindexhtml"));
    gulp.watch(["*.js", "!gulpfile.js"], gulp.series("copyjs"));
    gulp.watch("*.img", gulp.series("copyimg"));
    gulp.watch("sass/*.scss", gulp.series("sass"));
    gulp.watch("iconfont/*"), gulp.series("font");

    done();
})

gulp.task("build", gulp.parallel("copyimg", "copyjs", "copyindexhtml", "copyhtml", "font", "sass"));
gulp.task("default", gulp.series("server", "watch", "build"));