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
 * 自机对象
 *
*/
var Player = (function (_super) {
    __extends(Player, _super);
    /***角速度与运动计算相关参数***/
    function Player() {
        var _this = _super.call(this) || this;
        _this.speed = 5;
        _this.shooting = false;
        _this.createBulletArray();
        return _this;
    }
    Player.prototype.setOption = function (cos, stageX, stageY, oX, oY) {
        this.cos = cos;
        this.stageX = stageX;
        this.stageY = stageY;
        this.oX = oX;
        this.oY = oY;
    };
    Player.prototype.shoot = function () {
        if (!this.shooting) {
            var currentBullet = this.bulletArray;
            while (null != currentBullet) {
                currentBullet.x = this.x;
                currentBullet.y = this.y;
                currentBullet.addEventForRun();
                Main.gameStageContainer.addChild(currentBullet);
                currentBullet = currentBullet.nextBullet;
            }
            this.shooting = true;
        }
    };
    Player.prototype.stopShoot = function () {
        var currentBullet = this.bulletArray;
        while (null != currentBullet) {
            currentBullet.x = this.x;
            currentBullet.y = this.y;
            currentBullet.removeEventForRun();
            Main.gameStageContainer.removeChild(currentBullet);
            currentBullet = currentBullet.nextBullet;
        }
    };
    Player.prototype.createBulletArray = function () {
        var previousBullet = null;
        for (var i = 0; i < 10; i++) {
            var bullet = new Bullet();
            bullet.graphics.beginFill(0xff6699, 1);
            bullet.graphics.drawCircle(0, 0, 5);
            bullet.graphics.endFill();
            if (9 == i) {
                bullet.nextBullet = this.bulletArray;
            }
            if (null == previousBullet) {
                this.bulletArray = previousBullet = bullet;
            }
            else {
                previousBullet.nextBullet = bullet;
            }
        }
    };
    /**
     * 自机边界碰撞检测
     *
    */
    Player.prototype.checkBorder = function (cos) {
        var aSpeed;
        var bSpeed;
        if (cos > 0) {
            bSpeed = this.speed * cos;
            aSpeed = Math.sqrt(Math.pow(this.speed, 2) - Math.pow(bSpeed, 2));
        }
        else {
            bSpeed = aSpeed = this.speed;
        }
        if (this.x >= Main.gameStageContainer.width - this.width) {
            this.x -= bSpeed;
        }
        if (this.x < this.width) {
            this.x += bSpeed;
        }
        if (this.y >= Main.gameStageContainer.height - this.height) {
            this.y -= aSpeed;
        }
        if (this.y < this.height) {
            this.y += aSpeed;
        }
    };
    /**
     * 添加帧事件监听，使本对象按帧计算运动
     *
    */
    Player.prototype.addEventForRun = function () {
        if (!this.hasEventListener(egret.Event.ENTER_FRAME)) {
            this.addEventListener(egret.Event.ENTER_FRAME, this.operatePlayerRun, this);
        }
    };
    /**
     * 移除对帧事件监听
     *
    */
    Player.prototype.removeEventForRun = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operatePlayerRun, this);
    };
    /*
     * 计算自机运行方向与角速度，并控制自机移动
     */
    Player.prototype.operatePlayerRun = function () {
        switch (this.computeQuadrant()) {
            case 1:
                //第一象限
                this.x = this.x - this.speed * this.cos;
                this.y = this.y - Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * this.cos, 2));
                this.checkBorder(this.cos);
                ;
                break;
            case 2:
                //第二象限
                this.x = this.x + this.speed * this.cos;
                this.y = this.y - Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * this.cos, 2));
                this.checkBorder(this.cos);
                ;
                break;
            case 3:
                //第三象限
                this.x = this.x + this.speed * this.cos;
                this.y = this.y + Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * this.cos, 2));
                this.checkBorder(this.cos);
                ;
                break;
            case 4:
                //第四象限
                this.x = this.x - this.speed * this.cos;
                this.y = this.y + Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * this.cos, 2));
                this.checkBorder(this.cos);
                ;
                break;
            default:
                //y轴无速度
                if ((this.stageX - this.oX) > 0) {
                    this.x += this.speed;
                }
                else if ((this.stageX - this.oX) < 0) {
                    this.x -= this.speed;
                }
                //x轴无速度
                if ((this.stageY - this.oY) > 0) {
                    this.y += this.speed;
                }
                else if ((this.stageY - this.oY) < 0) {
                    this.y -= this.speed;
                }
                this.checkBorder(0);
                ;
        }
    };
    Player.prototype.computeQuadrant = function () {
        if ((this.stageX - this.oX) < 0 && (this.stageY - this.oY) < 0) {
            return 1;
        }
        if ((this.stageX - this.oX) > 0 && (this.stageY - this.oY) < 0) {
            return 2;
        }
        if ((this.stageX - this.oX) > 0 && (this.stageY - this.oY) > 0) {
            return 3;
        }
        if ((this.stageX - this.oX) < 0 && (this.stageY - this.oY) > 0) {
            return 4;
        }
        return 0;
    };
    return Player;
}(egret.Shape));
__reflect(Player.prototype, "Player");
/**
 * 自机普通弹药
 *
*/
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 3;
        return _this;
    }
    Bullet.prototype.addEventForRun = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    };
    Bullet.prototype.removeEventForRun = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    };
    Bullet.prototype.operateBulletRun = function () {
        this.y -= this.speed;
        if (this.y < 0) {
            this.y = Main.player.y;
            this.x = Main.player.x;
        }
    };
    return Bullet;
}(egret.Shape));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=Player.js.map