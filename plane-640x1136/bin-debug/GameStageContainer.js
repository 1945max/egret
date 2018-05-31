var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 游戏场景对象
 *
*/
var GameStageContainer = (function (_super) {
    __extends(GameStageContainer, _super);
    function GameStageContainer(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.createScreen(width, height);
        _this.createPointPanel(width, height);
        return _this;
    }
    GameStageContainer.prototype.createScreen = function (width, height) {
        var screen = new egret.Shape();
        screen.graphics.beginFill(0x444444, 1);
        screen.graphics.drawRect(0, 0, width, height);
        screen.graphics.endFill();
        this.addChild(screen);
        this.setChildIndex(screen, 1);
    };
    GameStageContainer.prototype.createPointPanel = function (width, height) {
        this.pointPanel = new PointPanel(0, 0, width, height);
        this.addChild(this.pointPanel);
        this.setChildIndex(this.pointPanel, 100);
    };
    return GameStageContainer;
}(egret.DisplayObjectContainer));
__reflect(GameStageContainer.prototype, "GameStageContainer");
/**
 * 参数面板对象
 *
*/
var PointPanel = (function (_super) {
    __extends(PointPanel, _super);
    function PointPanel(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.point = 0;
        _this.time = new egret.Timer(1000, -1);
        _this.timeStr = 0;
        _this.HP = 3;
        _this.HPArray = [];
        _this.boom = 3;
        _this.boomArray = [];
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.createContent();
        return _this;
    }
    PointPanel.prototype.createContent = function () {
        var point = new egret.TextField();
        point.text = this.point + "";
        point.size = 40;
        point.textColor = 0xfff000;
        point.x = 10;
        point.y = 10;
        this.addChild(point);
        this.setChildIndex(point, 3);
        var time = new egret.TextField();
        time.text = this.timeStr + "";
        time.size = 40;
        time.textColor = 0xfffeee;
        time.x = this.width - 10 - time.width;
        time.y = 10;
        this.addChild(time);
        this.setChildIndex(time, 3);
        for (var i = 0; i < this.HP; i++) {
            var hrBox = new egret.Shape();
            hrBox.graphics.beginFill(0xff0000, 1);
            hrBox.graphics.drawRect(10, this.height - 10 - 20, 40, 20);
            hrBox.graphics.endFill();
            hrBox.x += 40 * i + 10 * i;
            this.addChild(hrBox);
            this.setChildIndex(hrBox, 3);
            this.HPArray.push(hrBox);
            var boomBox = new egret.Shape();
            boomBox.graphics.beginFill(0x6666ff, 1);
            boomBox.graphics.drawRect(this.width - 150, this.height - 10 - 20, 40, 20);
            boomBox.graphics.endFill();
            boomBox.x += 40 * i + 10 * i;
            this.addChild(boomBox);
            this.setChildIndex(boomBox, 3);
            this.boomArray.push(boomBox);
        }
    };
    return PointPanel;
}(egret.DisplayObjectContainer));
__reflect(PointPanel.prototype, "PointPanel");
//# sourceMappingURL=GameStageContainer.js.map