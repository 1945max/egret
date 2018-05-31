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
        return _this;
    }
    /*
     * 计算自机运行方向与角速度，并控制自机移动
     */
    Player.prototype.operatePlayerRun = function (cos, s) {
        switch (s) {
            case 1:
                //第一象限
                Main.player.x -= this.speed * cos;
                Main.player.y -= Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * cos, 2));
                ;
                break;
            case 2:
                //第二象限
                Main.player.x += this.speed * cos;
                Main.player.y -= Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * cos, 2));
                ;
                break;
            case 3:
                //第三象限
                Main.player.x += this.speed * cos;
                Main.player.y += Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * cos, 2));
                ;
                break;
            case 4:
                //第四象限
                Main.player.x -= this.speed * cos;
                Main.player.y += Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * cos, 2));
                ;
                break;
        }
    };
    return Player;
}(egret.Shape));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map