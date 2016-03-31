/**
 * Created by xiaoxiaosu on 2016/3/31.
 */
    require('.less')
var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');

var View = Backbone.View.extend({
    list:new Backbone.Collection(),
    V:require('.ejs'),
    initialize:function () {
        this.render()
        this.initEvent()
    },

    render: function () {
        this.$el.html(this.template());
        this.$list = this.$el.find("ul");
        this.$error = this.$el.find(".JS-error");
        this.$loading = this.$el.find(".JS-loading");
        this.$empty = this.$el.find(".JS-empty");
    },
    initEvent:function () {
        var that = this;

        this.listenTo(this.list, "add", that.addItem);

        this.listenTo(this.list, "remove", this.removeItem);

        this.listenTo(this.list, "reset", function (models, options) {
            _.each(options.previousModels, function (model) {
                that.removeItem(model);
            });

            that.list.each(function (model) {
                that.addItem(model);
            });
        });

        this.listenTo(this.list, "add reset remove destroy", function () {
            if (that.list.length === 0) {
                that.$empty.show();
                that.$list.hide();
            } else {
                that.$list.show();
                that.$empty.hide();
            }
        });
    },
    // 根据ID获取列表项
    getItem: function (id) {
        return _.find(this.itemViews, function (view) {
            return id === view.model.get("id");
        });
    },

    // 添加列表项
    addItem: function (model, collection, options) {
        var itemview = new ItemView({
            model: model
        });

        options = options || {};

        if (options.at !== undefined) {
            if (options.at === 0) {
                this.$list.prepend(itemview.$el);
                this.itemViews.unshift(itemview);
            } else {
                var id = collection.at(options.at - 1).get("id");
                var view = this.getItem(id);
                view.$el.before(itemview.$el);
                this.itemViews.splice(options.at, 0, itemview);
            }
        } else {
            this.$moreLoading.before(itemview.$el);
            this.itemViews.push(itemview);
        }
    },

    // 删除列表项
    removeItem: function (model) {
        var view = this.getItem(model.get("id")),
            that = this;

        if (!view) {
            return;
        }
        view.destroy();

        _.find(this.itemViews, function (itemView, index) {
            if (itemView === view) {
                that.itemViews.splice(index, 1);
                return true;
            }
        });
    },
    destroy: function () {
        this.list.reset([]);
        this.remove();
    }
})

module.exports = View