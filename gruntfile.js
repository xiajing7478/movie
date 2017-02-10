/**
 * Created by Administrator on 2017/2/10.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        watch:{
            js:{
                files:['public/javascripts/**'],
                //task:['jshint'],
                options:{
                    livereload:true
                }
            }
        },

        nodemon:{
            dev:{
                options:{
                    file:'app.js',
                    args:[],
                    ignoredFiles:['README.md','node_modules/**']
                }
            }
        },

        concurrent:{
            task:['nodemon','watch'],
            options:{
                logConcurrentOutput:true
            }
        }
    })

    grunt.loadNpmTaks('grunt-contrib-watch');
    grunt.loadNpmTaks('grunt-nodemon');
    grunt.loadNpmTaks('grunt-concurrent');

    grunt.option('force',true);
    grunt.registerTask('default',['concurrent']);


}
