/**
 * Created by xiaoxiaosu on 2016/3/31.
 */
var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');

var View = Backbone.View.extend({
    initialize:function () {
        this.render()
        this.initEvent()
    },
    render:function () {
        
    },
    initEvent:function () {
        
    },
    destroy:function () {
        this.remove()
    }
})

module.exports = View