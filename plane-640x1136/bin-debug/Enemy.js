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
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(speedX, speedY) {
        var _this = _super.call(this) || this;
        _this.speedX = 0;
        _this.speedY = 5;
        _this.bulletArray = [];
        _this.speedX = speedX;
        _this.speedY = speedY;
        return _this;
    }
    Enemy.prototype.shoot = function (current) {
        if (Common.enemyMoveManager.bulletArray.length > 0) {
            var enemyBullet = Common.enemyMoveManager.bulletArray.pop();
            enemyBullet.x = current.x;
            enemyBullet.y = current.y;
            Common.gameStageContainer.addChild(enemyBullet);
            enemyBullet.shootToTarget(enemyBullet.x, enemyBullet.y, Common.player.x + Common.player.width / 2, Common.player.y + Common.player.height / 2);
        }
    };
    Enemy.prototype.addEventForRun = function () {
        var enemyX = this.x;
        var enemyY = this.y;
        setTimeout(this.shoot(this), 2000);
        this.addEventListener(egret.Event.ENTER_FRAME, this.operateEnemyRun, this);
    };
    Enemy.prototype.removeEventForRun = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operateEnemyRun, this);
    };
    Enemy.prototype.operateEnemyRun = function () {
        if (Common.FRAME_STATUS) {
            this.x += this.speedX;
            this.y += this.speedY;
            if (null != this.parent) {
                if (this.y <= 0 || this.y >= this.parent.height || this.x <= 0 || this.x >= this.parent.height) {
                    this.stop();
                }
            }
            Common.hit(Common.player, this);
        }
    };
    Enemy.prototype.stop = function () {
        this.removeEventForRun();
        this.parent.removeChild(this);
        Common.enemyMoveManager.enemyArray.push(this);
        delete Common.enemyMoveManager.enemyArrayRun[Common.enemyMoveManager.enemyArrayRun.indexOf(this)];
    };
    return Enemy;
}(egret.Shape));
__reflect(Enemy.prototype, "Enemy");
var BulletOfEnemy = (function (_super) {
    __extends(BulletOfEnemy, _super);
    function BulletOfEnemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 10;
        _this.speedX = 0;
        _this.speedY = 0;
        return _this;
    }
    BulletOfEnemy.prototype.shootToTarget = function (x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        var b = Math.abs(x - targetX);
        var a = Math.abs(y - targetY);
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(a, 2));
        var cos = b / c;
        if (x > targetX) {
            this.speedX = -1 * this.speed * cos;
        }
        else if (x < targetX) {
            this.speedX = this.speed * cos;
        }
        if (y > targetY) {
            this.speedY = -1 * Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speedX, 2));
        }
        else if (y < targetY) {
            this.speedY = Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speedX, 2));
        }
        this.addEventForRun();
    };
    BulletOfEnemy.prototype.addEventForRun = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    };
    BulletOfEnemy.prototype.removeEventForRun = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    };
    BulletOfEnemy.prototype.operateBulletRun = function () {
        if (Common.FRAME_STATUS) {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.parent) {
                if (this.y >= this.parent.height || this.x <= 0 || this.x >= this.parent.height) {
                    this.removeEventForRun();
                    this.parent.removeChild(this);
                    Common.enemyMoveManager.bulletArray.push(this);
                }
                Common.hit(Common.player, this);
            }
        }
    };
    return BulletOfEnemy;
}(egret.Shape));
__reflect(BulletOfEnemy.prototype, "BulletOfEnemy");
//# sourceMappingURL=Enemy.js.map