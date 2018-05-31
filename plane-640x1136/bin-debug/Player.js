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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 1;
        _this.quadrant = 1;
        return _this;
    }
    /*
     * 计算自机运行方向与角速度，并控制自机移动
     */
    Player.prototype.operatePlayerRun = function (cos, currX, currY, oX, oY) {
        switch (this.computeQuadrant(currX, currY, oX, oY)) {
            case 1:
                //第一象限
                console.log("Quadrant:" + 1);
                Main.player.x = Main.player.x - this.speed * cos;
                Main.player.y = Main.player.y - Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * cos, 2));
                ;
                break;
            case 2:
                //第二象限
                console.log("Quadrant:" + 2);
                Main.player.x = Main.player.x + this.speed * cos;
                Main.player.y = Main.player.y - Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * cos, 2));
                ;
                break;
            case 3:
                //第三象限
                console.log("Quadrant:" + 3);
                Main.player.x = Main.player.x + this.speed * cos;
                Main.player.y = Main.player.y + Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * cos, 2));
                ;
                break;
            case 4:
                //第四象限
                console.log("Quadrant:" + 4);
                Main.player.x = Main.player.x - this.speed * cos;
                Main.player.y = Main.player.y + Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * cos, 2));
                ;
                break;
            default:
                //y轴无速度
                if ((currX - oX) > 0) {
                    Main.player.x += this.speed;
                }
                else if ((currX - oX) < 0) {
                    Main.player.x -= this.speed;
                }
                //x轴无速度
                if ((currY - oY) > 0) {
                    Main.player.y += this.speed;
                }
                else if ((currY - oY) < 0) {
                    Main.player.y -= this.speed;
                }
                ;
        }
    };
    Player.prototype.computeQuadrant = function (currX, currY, oX, oY) {
        if ((currX - oX) < 0 && (currY - oY) < 0) {
            return 1;
        }
        if ((currX - oX) > 0 && (currY - oY) < 0) {
            return 2;
        }
        if ((currX - oX) > 0 && (currY - oY) > 0) {
            return 3;
        }
        if ((currX - oX) < 0 && (currY - oY) > 0) {
            return 4;
        }
        return 0;
    };
    return Player;
}(egret.Shape));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map