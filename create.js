/**
 * Created by xiaoxiaosu on 2016/3/31.
 */
/**
 * Created by xiaoxiaosu on 2016/3/31.
 */
var config = require('./create.config'),
    fs = require('fs'),
    path = require('path'),
    querystring = require('querystring');

var template = './template/'

function createFiles(name) {
    var type = name.match(/type=(\w+)/)
    if(type){
        type = type[1]

    }else {
        type = 'default'
    }
    var name = name.replace(/\?.+/,'')

    if(!fs.existsSync(name)){

        fs.mkdirSync(name)
        var fileName =  path.basename(name)
        if(!fs.existsSync(name+'/'+fileName+'.js')){
            var jsContent
            if(fs.existsSync(template+type+'.js')){
                jsContent = fs.readFileSync(template+type+'.js')
            }else {
                jsContent = fs.readFileSync(template+'default'+'.js')
            }
            console.log(name+'/'+fileName+'.js has written')
            fs.writeFileSync(name+'/'+fileName+'.js',jsContent)
        }

        if(!fs.existsSync(name+'/'+fileName+'.less')){
            var lessContent
            if(fs.existsSync(template+type+'.less')){
                lessContent = fs.readFileSync(template+type+'.less')
            }else {
                lessContent = fs.readFileSync(template+'default'+'.less')
            }
            console.log(name+'/'+fileName+'.less has written')
            fs.writeFileSync(name+'/'+fileName+'.less',lessContent)
        }

        if(!fs.existsSync(name+'/'+fileName+'.ejs')){
            var ejsContent
            if(fs.existsSync(template+type+'.ejs')){
                ejsContent = fs.readFileSync(template+type+'.ejs')
            }else {
                ejsContent = fs.readFileSync(template+'default'+'.ejs')
            }
            console.log(name+'/'+fileName+'.ejs has written')
            fs.writeFileSync(name+'/'+fileName+'.ejs',ejsContent)
        }
    }

}

for(var i = 0 ;i<config.length;i++){
    createFiles(config[i])
}

