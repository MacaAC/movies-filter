const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer')

const css = (done) => {
    src('src/scss/app.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(postcss([autoprefixer()]))
        .pipe( dest('build/css') )
    done()
}
const dev = () => {
    watch('src/scss/**/*.scss')
    watch('src/scss/app.scss', css)
}
exports.css = css
exports.dev = dev
exports.default = series(css,dev)