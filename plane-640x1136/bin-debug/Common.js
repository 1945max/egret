var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Common = (function () {
    function Common() {
    }
    Common.boom = function (obj1, obj2) {
        if (Common.hitTestP(obj1, obj2)) {
            console.log("碰撞类型boom...");
            obj1.stop();
            obj2.stop();
            var boom_1 = new egret.Shape();
            boom_1.graphics.beginFill(0xffff00, 1);
            boom_1.graphics.drawCircle(0, 0, 10);
            boom_1.graphics.endFill();
            if (obj1.x > obj2.x) {
                boom_1.x = (obj1.x - obj2.x) / 2 + obj2.x;
            }
            else {
                boom_1.x = (obj2.x - obj2.x) / 2 + obj2.x;
            }
            if (obj1.y > obj2.y) {
                boom_1.y = (obj1.y - obj2.y) / 2 + obj2.y;
            }
            else {
                boom_1.y = (obj2.y - obj1.y) / 2 + obj1.y;
            }
            Common.gameStageContainer.addChild(boom_1);
            egret.Tween.get(boom_1).to({ scaleX: 5, scaleY: 5 }, 500).call(function () {
                Common.gameStageContainer.removeChild(boom_1);
            });
        }
    };
    Common.shoot = function (obj1, obj2) {
        if (Common.hitTestP(obj1, obj2)) {
            console.log("碰撞类型shoot...");
            obj1.stop();
            obj2.stop();
            // Common.gameStageContainer.removeChild(obj1);
            // Common.gameStageContainer.removeChild(obj2);
            var boom_2 = new egret.Shape();
            boom_2.graphics.beginFill(0xffff00, 1);
            boom_2.graphics.drawCircle(0, 0, 10);
            boom_2.graphics.endFill();
            if (obj1.x > obj2.x) {
                boom_2.x = (obj1.x - obj2.x) / 2 + obj2.x;
            }
            else {
                boom_2.x = (obj2.x - obj2.x) / 2 + obj2.x;
            }
            if (obj1.y > obj2.y) {
                boom_2.y = (obj1.y - obj2.y) / 2 + obj2.y;
            }
            else {
                boom_2.y = (obj2.y - obj1.y) / 2 + obj1.y;
            }
            Common.gameStageContainer.addChild(boom_2);
            egret.Tween.get(boom_2).to({ scaleX: 5, scaleY: 5 }, 500).call(function () {
                Common.gameStageContainer.removeChild(boom_2);
            });
            Common.gameStageContainer.pointPanel.addPoint();
        }
    };
    Common.hit = function (obj1, obj2) {
        if (!Common.player.invincibleStatus && Common.hitTestP(obj1, obj2)) {
            if (Common.gameStageContainer.pointPanel.HP == 0) {
                Common.gameOver(obj1, obj2);
            }
            else {
                Common.player.invincibleStatus = true;
                var bruiseSound = RES.getRes("bruise_mp3");
                bruiseSound.play(0, 1);
                egret.Tween.get(Common.player).to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250).to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250)
                    .to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250).to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250)
                    .to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250).to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250)
                    .call(function () {
                    Common.player.invincibleStatus = false;
                });
                Common.gameStageContainer.pointPanel.removeHP();
            }
        }
    };
    Common.gameOver = function (obj1, obj2) {
        Common.FRAME_STATUS = false;
        Common.system.timer.stop();
        Common.gameStageContainer.removeChild(obj1);
        Common.gameStageContainer.removeChild(obj2);
        var boom = new egret.Shape();
        boom.graphics.beginFill(0xffff00, 1);
        boom.graphics.drawCircle(0, 0, 10);
        boom.graphics.endFill();
        if (obj1.x > obj2.x) {
            boom.x = (obj1.x - obj2.x) / 2 + obj2.x;
        }
        else {
            boom.x = (obj2.x - obj2.x) / 2 + obj2.x;
        }
        if (obj1.y > obj2.y) {
            boom.y = (obj1.y - obj2.y) / 2 + obj2.y;
        }
        else {
            boom.y = (obj2.y - obj1.y) / 2 + obj1.y;
        }
        Common.gameStageContainer.addChild(boom);
        egret.Tween.get(boom).to({ scaleX: 5, scaleY: 5 }, 500).call(function () {
            Common.gameStageContainer.removeChild(boom);
            Common.gameStageContainer.gameOverPanel.show();
        });
        Main.soundChannel.stop();
        Common.player.soundBoom.play(0, 1);
    };
    Common.hitTestP = function (obj1, obj2) {
        if (obj1 && obj2) {
            var rect1 = obj1.getBounds(); //获取显示对象的测量边界
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
            return rect1.intersects(rect2);
        }
    };
    Common.GAME_STATUS = true;
    Common.FRAME_STATUS = true;
    return Common;
}());
__reflect(Common.prototype, "Common");
//# sourceMappingURL=Common.js.map