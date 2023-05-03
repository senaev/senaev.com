define(function () {
    //кнопка назад, может меняться на кнопку обновить для нового уровня
    var UndoButton = function (o) {
        var undoButton = this;
        var undefined;

        this.app = o.app;
        this.active = false;
        this.caption = "undo";
        this.func = undoButton.app.undo;

        this.$el = $('<div class="undoButton blocked">undo</div>').click(function () {
            if (undoButton.active) {
                undoButton.func.apply(undoButton.app);
            }
        });
        this.$el.appendTo(undoButton.app.container.children(".panel.topRightPanel").first());

        this._set = function (o) {
            if (o.func !== undefined && undoButton.func !== o.func) {
                undoButton.func = o.func;
            }
            if (o.caption !== undefined && undoButton.caption !== o.caption) {
                undoButton.caption = o.caption;
                undoButton.$el.html(o.caption);
            }
            if (o.active !== undefined && undoButton.active !== o.active) {
                undoButton.active = o.active;
                if (undoButton.active) {
                    undoButton.$el.removeClass("blocked");
                }
                else {
                    undoButton.$el.addClass("blocked");
                }
            }
        };

        this._get = function (prop) {
            return undoButton[prop];
        };
    };
    return UndoButton;
});
