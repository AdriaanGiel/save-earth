let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */



mix.js('resources/js/main.js', 'public/js')
    .stylus('resources/stylus/app.styl', 'public/css')
    .combine(['node_modules/howler/dist/howler.js'],'public/js/vendor.js')
    .version()
    .setPublicPath('public')
    .options({
        processCssUrls: false
    });

