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
        screen.graphics.beginFill(0xeeeeee, 1);
        screen.graphics.drawRect(0, 0, width, height);
        screen.graphics.endFill();
        this.addChild(screen);
    };
    GameStageContainer.prototype.createPointPanel = function (width, height) {
        var pointPanel = new PointPanel(0, 0, width / 4, height);
        var point = new egret.TextField();
        point.text = "得分:" + pointPanel.point;
        point.size = 30;
        point.textColor = 0x2f2e30;
        point.x = 10;
        point.y = 10;
        pointPanel.addChild(point);
        this.addChild(pointPanel);
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
        _this.boom = 3;
        _this.x = x;
        _this.y = y;
        _this.width = width / 4;
        _this.height = height;
        return _this;
    }
    return PointPanel;
}(egret.DisplayObjectContainer));
__reflect(PointPanel.prototype, "PointPanel");
//# sourceMappingURL=GameStageContainer.js.map