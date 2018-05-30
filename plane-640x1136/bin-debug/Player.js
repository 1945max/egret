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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
     * 计算自机运行方向与角速度，并控制自机移动
     */
    Player.prototype.operatePlayerRun = function (cos, s) {
        switch (s) {
            case 1:
                //第一区间
                Main.player.x -= Main.playerSpeed * cos;
                Main.player.y -= Math.sqrt(Math.pow(Main.playerSpeed, 2) - Math.pow(Main.playerSpeed * cos, 2));
                ;
                break;
            case 2:
                //第二区间
                Main.player.x += Main.playerSpeed * cos;
                Main.player.y -= Math.sqrt(Math.pow(Main.playerSpeed, 2) - Math.pow(Main.playerSpeed * cos, 2));
                ;
                break;
            case 3:
                //第三区间
                Main.player.x += Main.playerSpeed * cos;
                Main.player.y += Math.sqrt(Math.pow(Main.playerSpeed, 2) - Math.pow(Main.playerSpeed * cos, 2));
                ;
                break;
            case 4:
                //第四区间
                Main.player.x -= Main.playerSpeed * cos;
                Main.player.y += Math.sqrt(Math.pow(Main.playerSpeed, 2) - Math.pow(Main.playerSpeed * cos, 2));
                ;
                break;
        }
    };
    return Player;
}(egret.Shape));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map