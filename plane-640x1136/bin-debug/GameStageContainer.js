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
        _this.createPausePanel(width, height);
        _this.createGameOverPanel(width, height);
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
    GameStageContainer.prototype.createPausePanel = function (width, height) {
        this.pausePanel = new PausePanel(0, 0, width, height);
    };
    GameStageContainer.prototype.createGameOverPanel = function (width, height) {
        this.gameOverPanel = new GameOverPanel(0, 0, width, height);
    };
    return GameStageContainer;
}(egret.DisplayObjectContainer));
__reflect(GameStageContainer.prototype, "GameStageContainer");
var PausePanel = (function (_super) {
    __extends(PausePanel, _super);
    function PausePanel(x, y, width, height) {
        var _this = _super.call(this) || this;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.5);
        bg.graphics.drawRect(0, 0, width, height);
        bg.graphics.endFill();
        _this.addChild(bg);
        _this.textField = new egret.TextField();
        _this.textField.text = "PAUSE";
        _this.textField.size = 100;
        _this.textField.textColor = 0xffffff;
        _this.textField.x = (width - _this.textField.width) / 2;
        _this.textField.y = (height - _this.textField.height) / 2;
        _this.addChild(_this.textField);
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    PausePanel.prototype.show = function () {
        if (Common.gameStageContainer.contains(this)) {
            Common.gameStageContainer.removeChild(this);
            // egret.Tween.get(this).to({y:this.height}, 1000, egret.Ease.backInOut).call(function() {
            // });
        }
        else {
            Common.gameStageContainer.addChild(this);
            // egret.Tween.get(this).to({y:0}, 1000, egret.Ease.backInOut);
        }
    };
    return PausePanel;
}(egret.DisplayObjectContainer));
__reflect(PausePanel.prototype, "PausePanel");
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel(x, y, width, height) {
        var _this = _super.call(this) || this;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.5);
        bg.graphics.drawRect(0, 0, width, height);
        bg.graphics.endFill();
        _this.addChild(bg);
        _this.textField = new egret.TextField();
        _this.textField.text = "GAME OVER";
        _this.textField.size = 70;
        _this.textField.textColor = 0xffffff;
        _this.textField.x = (width - _this.textField.width) / 2;
        _this.textField.y = (height - _this.textField.height) / 2;
        _this.addChild(_this.textField);
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    GameOverPanel.prototype.show = function () {
        Common.gameStageContainer.addChild(this);
    };
    return GameOverPanel;
}(egret.DisplayObjectContainer));
__reflect(GameOverPanel.prototype, "GameOverPanel");
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
        this.PointText = new egret.TextField();
        this.PointText.text = this.point + "";
        this.PointText.size = 40;
        this.PointText.textColor = 0xfff000;
        this.PointText.x = 10;
        this.PointText.y = 10;
        this.addChild(this.PointText);
        this.setChildIndex(this.PointText, 3);
        this.timeText = new egret.TextField();
        this.timeText.text = this.timeStr + "";
        this.timeText.size = 40;
        this.timeText.textColor = 0xfffeee;
        this.timeText.x = this.PointText.x;
        this.timeText.y = this.PointText.y + this.PointText.height + 10;
        this.addChild(this.timeText);
        this.setChildIndex(this.timeText, 3);
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
    PointPanel.prototype.removeBoom = function () {
        this.boom--;
        for (var _i = 0, _a = this.boomArray; _i < _a.length; _i++) {
            var boom = _a[_i];
            if (boom.parent) {
                boom.parent.removeChild(boom);
                return;
            }
        }
    };
    PointPanel.prototype.addBoom = function () {
        this.boom++;
        for (var i = this.boomArray.length - 1; i >= 0; i--) {
            if (!this.boomArray[i].parent) {
                this.boomArray[i].parent.addChild(this.boomArray[i]);
                return;
            }
        }
    };
    PointPanel.prototype.removeHP = function () {
        this.HP--;
        for (var _i = 0, _a = this.HPArray; _i < _a.length; _i++) {
            var hp = _a[_i];
            if (hp.parent) {
                hp.parent.removeChild(hp);
                return;
            }
        }
    };
    PointPanel.prototype.addHP = function () {
        this.HP++;
        for (var i = this.HPArray.length - 1; i >= 0; i--) {
            if (!this.HPArray[i].parent) {
                this.HPArray[i].parent.addChild(this.HPArray[i]);
                return;
            }
        }
    };
    PointPanel.prototype.addPoint = function () {
        this.point += 100;
        this.PointText.text = this.point + "";
    };
    PointPanel.prototype.addTime = function () {
        this.timeStr += 1;
        this.timeText.text = this.timeStr + "";
    };
    return PointPanel;
}(egret.DisplayObjectContainer));
__reflect(PointPanel.prototype, "PointPanel");
//# sourceMappingURL=GameStageContainer.js.map