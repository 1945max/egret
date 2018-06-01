/**
 * 自机对象
 * 
*/
class Player extends egret.Shape {

    private speed = 5;

    public bulletArray:Array<Bullet> = [];

    private shootId:number;

    public boomBox:Array<Array<Boom>> = [];

    /***角速度与运动计算相关参数***/

    private cos:number;

    private stageX:number;

    private stageY:number;

    private oX:number;

    private oY:number;

    /***角速度与运动计算相关参数***/

    public constructor() {
        super();
        this.createBulletArray();
        this.createBoomArray();
    }

    public setOption(cos:number, stageX:number, stageY:number, oX:number, oY:number) {
        this.cos = cos;
        this.stageX = stageX;
        this.stageY = stageY;
        this.oX = oX;
        this.oY = oY;
    }

    public longShoot() {
        this.shoot();
        this.shootId = setTimeout(function() {
            Main.player.longShoot();
        }, 200);
    }

    public stopShoot() {
        clearTimeout(this.shootId);
    }

    private shoot() {
        let currentBullet = this.bulletArray[this.bulletArray.length-1];
        this.bulletArray.pop();
        currentBullet.x = this.x;
        currentBullet.y = this.y;
        currentBullet.addEventForRun();
        this.parent.addChild(currentBullet);
        this.parent.swapChildren(currentBullet, this);
        this.parent.swapChildren(this, Main.gameStageContainer.pointPanel);
    }

    private createBulletArray() {
        for (var i = 0;i < 10;i++) {
            let bullet = new Bullet();
            bullet.graphics.beginFill(0xff6699, 1);
            bullet.graphics.drawCircle(0, 0, 5);
            bullet.graphics.endFill();
            bullet.name = "bullet_"+i;
            this.bulletArray.push(bullet);
        }
    }

    public boom() {
        if (Main.gameStageContainer.pointPanel.boom >= 1) {
            Main.gameStageContainer.pointPanel.removeBoom();
            let currentBoomArray = this.boomBox[2];
            this.boomBox[2] = this.boomBox[1];
            this.boomBox[1] = this.boomBox[0];
            this.boomBox[0] = currentBoomArray;
            for (var boom of currentBoomArray) {
                boom.x = this.x;
                boom.y = this.y;
                boom.addEventForRun();
                this.parent.addChild(boom);
                this.parent.swapChildren(boom, this);
            }
        }
    }

    private createBoomArray() {
        let cos:Array<Array<number>> = [[Math.sqrt(3)/2, 1], [1/2, 1], [Math.sqrt(3)/2, 2], [1/2, 2], [Math.sqrt(3)/2, 3], [1/2, 3], [Math.sqrt(3)/2, 4], [1/2, 4]];
        for (var i = 0;i < 3;i++) {
            let boomArray:Array<Boom> = [];
            for (var j = 0;j < 8;j++) {
                let boom = new Boom(cos[j][0], cos[j][1]);
                boom.graphics.beginFill(0xcc0099, 1);
                boom.graphics.drawCircle(0, 0, 5);
                boom.graphics.endFill();
                boom.name = "boom_"+i+"_"+j;
                boomArray.push(boom);
            }
            this.boomBox.push(boomArray);
        }
    }

    /**
     * 自机边界碰撞检测
     * 
    */
    private checkBorder(cos:number) {
        let aSpeed;
        let bSpeed;
        if (cos > 0) {
            bSpeed = this.speed*cos;
            aSpeed = Math.sqrt(Math.pow(this.speed, 2) - Math.pow(bSpeed, 2));
        } else {
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
    }

    /**
     * 添加帧事件监听，使本对象按帧计算运动
     * 
    */
    public addEventForRun() {
        if (!this.hasEventListener(egret.Event.ENTER_FRAME)) {
            this.addEventListener(egret.Event.ENTER_FRAME, this.operatePlayerRun, this);
        }
    }

    /**
     * 移除对帧事件监听
     * 
    */
    public removeEventForRun() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operatePlayerRun, this);
    }
    /* 
     * 计算自机运行方向与角速度，并控制自机移动
     */
    public operatePlayerRun() {
        switch(this.computeQuadrant()) {
            case 1:
                //第一象限
                this.x = this.x - this.speed*this.cos;
                this.y = this.y - Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*this.cos, 2));
                this.checkBorder(this.cos);
            ;break;
            case 2:
                //第二象限
                this.x = this.x + this.speed*this.cos;
                this.y = this.y - Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*this.cos, 2));
                this.checkBorder(this.cos);
            ;break;
            case 3:
                //第三象限
                this.x = this.x + this.speed*this.cos;
                this.y = this.y + Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*this.cos, 2));
                this.checkBorder(this.cos);
            ;break;
            case 4:
                //第四象限
                this.x = this.x - this.speed*this.cos;
                this.y = this.y + Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*this.cos, 2));
                this.checkBorder(this.cos);
            ;break;
            default:
                //y轴无速度
                if ((this.stageX - this.oX)>0) {
                    this.x+=this.speed
                } else if ((this.stageX - this.oX)<0) {
                    this.x-=this.speed
                }
                //x轴无速度
                if ((this.stageY - this.oY)>0) {
                    this.y+=this.speed
                } else if ((this.stageY - this.oY)<0) {
                    this.y-=this.speed
                }
                this.checkBorder(0);
            ;
        }
    }

    private computeQuadrant() {
        if ((this.stageX - this.oX)<0 && (this.stageY - this.oY)<0) {
            return 1;
        }
        if ((this.stageX - this.oX)>0 && (this.stageY - this.oY)<0) {
            return 2;
        }
        if ((this.stageX - this.oX)>0 && (this.stageY - this.oY)>0) {
            return 3;
        }
        if ((this.stageX - this.oX)<0 && (this.stageY - this.oY)>0) {
            return 4;
        }
        return 0;
    }
}

/**
 * 自机普通弹药
 * 
*/
class Bullet extends egret.Shape {

    public nextBullet:Bullet;

    public speed = 10;

    public addEventForRun() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    }

    public removeEventForRun() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    }

    private operateBulletRun() {
        this.y -= this.speed;
        if (this.y <= this.width) {
            Main.player.bulletArray.push(this);
            this.removeEventForRun();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }

}

class Boom extends egret.Shape {

    private speed = 10;

    private speedX = 0;

    private speedY = 0;

    private quadrant = 1;

    private cos = 0;

    public constructor(cos:number, quadrant:number) {
        super();
        this.cos = cos;
        this.quadrant = quadrant;
        this.computeRun();
    }

    private computeRun() {
        switch(this.quadrant) {
            case 1:
                //第一象限
                this.speedX = -1*this.speed*this.cos;
                this.speedY = -1*Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*this.cos, 2));
            ;break;
            case 2:
                //第二象限
                this.speedX = this.speed*this.cos;
                this.speedY = -1*Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*this.cos, 2));
            ;break;
            case 3:
                //第三象限
                this.speedX = this.speed*this.cos;
                this.speedY = Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*this.cos, 2));
            ;break;
            case 4:
                //第四象限
                this.speedX = -1*this.speed*this.cos;
                this.speedY = Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*this.cos, 2));
            ;break;
            default:;
        }
    }

    public addEventForRun() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    }

    public removeEventForRun() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    }

    private operateBulletRun() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y <= 0||this.y >= this.parent.height||this.x <= 0||this.x >= this.parent.height) {
            this.removeEventForRun();
            this.parent.removeChild(this);
        }
    }

}