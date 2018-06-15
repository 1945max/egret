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
        _this.bulletArray = [];
        _this.boomBox = [];
        _this.createBulletArray();
        _this.createBoomArray();
        return _this;
    }
    Player.prototype.setOption = function (cos, stageX, stageY, oX, oY) {
        this.cos = cos;
        this.stageX = stageX;
        this.stageY = stageY;
        this.oX = oX;
        this.oY = oY;
    };
    Player.prototype.longShoot = function () {
        if (Common.FRAME_STATUS) {
            this.shoot();
            this.shootId = setTimeout(function () {
                Common.player.longShoot();
            }, 200);
        }
    };
    Player.prototype.stopShoot = function () {
        clearTimeout(this.shootId);
    };
    Player.prototype.shoot = function () {
        var currentBullet = this.bulletArray.pop();
        currentBullet.x = this.x;
        currentBullet.y = this.y;
        currentBullet.addEventForRun();
        this.parent.addChild(currentBullet);
        this.parent.swapChildren(currentBullet, this);
        this.parent.swapChildren(this, Common.gameStageContainer.pointPanel);
    };
    Player.prototype.createBulletArray = function () {
        for (var i = 0; i < 10; i++) {
            var bullet = new Bullet();
            bullet.graphics.beginFill(0xff6699, 1);
            bullet.graphics.drawCircle(0, 0, 5);
            bullet.graphics.endFill();
            bullet.name = "bullet_" + i;
            this.bulletArray.push(bullet);
        }
    };
    Player.prototype.boom = function () {
        if (Common.FRAME_STATUS) {
            if (Common.gameStageContainer.pointPanel.boom >= 1) {
                Common.gameStageContainer.pointPanel.removeBoom();
                var currentBoomArray = this.boomBox[2];
                this.boomBox[2] = this.boomBox[1];
                this.boomBox[1] = this.boomBox[0];
                this.boomBox[0] = currentBoomArray;
                for (var _i = 0, currentBoomArray_1 = currentBoomArray; _i < currentBoomArray_1.length; _i++) {
                    var boom = currentBoomArray_1[_i];
                    boom.x = this.x;
                    boom.y = this.y;
                    boom.addEventForRun();
                    this.parent.addChild(boom);
                    this.parent.swapChildren(boom, this);
                }
            }
        }
    };
    Player.prototype.createBoomArray = function () {
        var cos = [];
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 9; j++) {
                var currentCos = [];
                currentCos.push(Math.cos(10 * j));
                currentCos.push(i);
                cos.push(currentCos);
            }
        }
        for (var i = 0; i < 3; i++) {
            var boomArray = [];
            for (var j = 0; j < cos.length; j++) {
                var boom = new Boom(cos[j][0], cos[j][1]);
                boom.graphics.beginFill(0xcc0099, 1);
                boom.graphics.drawCircle(0, 0, 5);
                boom.graphics.endFill();
                boom.name = "boom_" + i + "_" + j;
                boomArray.push(boom);
            }
            this.boomBox.push(boomArray);
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
        if (this.x >= Common.gameStageContainer.width - this.width) {
            this.x -= bSpeed;
        }
        if (this.x < this.width) {
            this.x += bSpeed;
        }
        if (this.y >= Common.gameStageContainer.height - this.height) {
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
        if (Common.FRAME_STATUS) {
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
            }
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
        _this.speed = 10;
        return _this;
    }
    Bullet.prototype.addEventForRun = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    };
    Bullet.prototype.removeEventForRun = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    };
    Bullet.prototype.operateBulletRun = function () {
        if (Common.FRAME_STATUS) {
            this.y -= this.speed;
            if (this.y <= this.width) {
                Common.player.bulletArray.push(this);
                this.removeEventForRun();
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }
        }
    };
    return Bullet;
}(egret.Shape));
__reflect(Bullet.prototype, "Bullet");
var Boom = (function (_super) {
    __extends(Boom, _super);
    function Boom(cos, quadrant) {
        var _this = _super.call(this) || this;
        _this.speed = 10;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.quadrant = 1;
        _this.cos = 0;
        _this.cos = cos;
        _this.quadrant = quadrant;
        _this.computeRun();
        return _this;
    }
    Boom.prototype.computeRun = function () {
        switch (this.quadrant) {
            case 1:
                //第一象限
                this.speedX = -1 * this.speed * this.cos;
                this.speedY = -1 * Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * this.cos, 2));
                ;
                break;
            case 2:
                //第二象限
                this.speedX = this.speed * this.cos;
                this.speedY = -1 * Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * this.cos, 2));
                ;
                break;
            case 3:
                //第三象限
                this.speedX = this.speed * this.cos;
                this.speedY = Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * this.cos, 2));
                ;
                break;
            case 4:
                //第四象限
                this.speedX = -1 * this.speed * this.cos;
                this.speedY = Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speed * this.cos, 2));
                ;
                break;
            default: ;
        }
    };
    Boom.prototype.addEventForRun = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.operateBoomRun, this);
    };
    Boom.prototype.removeEventForRun = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operateBoomRun, this);
    };
    Boom.prototype.operateBoomRun = function () {
        if (Common.FRAME_STATUS) {
            this.y += this.speedY;
            this.x += this.speedX;
            if (this.y <= 0 || this.y >= this.parent.height || this.x <= 0 || this.x >= this.parent.height) {
                this.removeEventForRun();
                this.parent.removeChild(this);
            }
        }
    };
    return Boom;
}(egret.Shape));
__reflect(Boom.prototype, "Boom");
//# sourceMappingURL=Player.js.map