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

    private soundShoot:egret.Sound;

    public soundBoom:egret.Sound;

    public invincibleStatus:boolean = false;

    /***角速度与运动计算相关参数***/

    public constructor() {
        super();
        this.createBulletArray();
        this.createBoomArray();
        this.soundShoot = RES.getRes("shoot_mp3");
        this.soundBoom = RES.getRes("boom_mp3");
    }

    public setOption(cos:number, stageX:number, stageY:number, oX:number, oY:number) {
        this.cos = cos;
        this.stageX = stageX;
        this.stageY = stageY;
        this.oX = oX;
        this.oY = oY;
    }

    public longShoot() {
        if (Common.FRAME_STATUS) {
            this.shoot();
            this.shootId = setTimeout(function() {
                Common.player.longShoot();
            }, 200);
        }
    }

    public stopShoot() {
        clearTimeout(this.shootId);
    }

    private shoot() {

        let currentBullet = this.bulletArray.pop();
        if (currentBullet) {

        currentBullet.x = this.x;
        currentBullet.y = this.y;
        currentBullet.addEventForRun();
        this.parent.addChild(currentBullet);
        this.parent.swapChildren(currentBullet, this);
        this.parent.swapChildren(this, Common.gameStageContainer.pointPanel);

        this.soundShoot.play(0, 1);

        }
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
        if (Common.FRAME_STATUS) {
            if (Common.gameStageContainer.pointPanel.boom >= 1) {
                Common.gameStageContainer.pointPanel.removeBoom();
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
    }

    private createBoomArray() {
        let cos:Array<Array<number>> = [];

        for (var i = 1;i < 5;i++) {
            for (var j = 0;j < 9;j++) {
                let currentCos:Array<number> = [];
                currentCos.push(Math.cos(10*j));
                currentCos.push(i);
                cos.push(currentCos);
            }
        }
        
        for (var i = 0;i < 3;i++) {
            let boomArray:Array<Boom> = [];
            for (var j = 0;j < cos.length;j++) {
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
        if (Common.FRAME_STATUS) {
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
        }
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
        if (Common.enemyMoveManager.enemyArrayRun.length>0) {

        for (let enemy of Common.enemyMoveManager.enemyArrayRun) {
            Common.shoot(enemy, this);
        }
        }
        if (Common.FRAME_STATUS) {
            this.y -= this.speed;
        if (this.y <= this.width) {
            this.stop();
        }
        }
    }

    public stop() {
        Common.player.bulletArray.push(this);
        this.removeEventForRun();
        if (this.parent) {
           this.parent.removeChild(this);
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
        this.addEventListener(egret.Event.ENTER_FRAME, this.operateBoomRun, this);
    }

    public removeEventForRun() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operateBoomRun, this);
    }

    private operateBoomRun() {
        if (Common.FRAME_STATUS) {
            this.y += this.speedY;
            this.x += this.speedX;
            for (let enemy of Common.enemyMoveManager.enemyArrayRun) {
                Common.boom(enemy, this);
            }
            if (this.parent) {

            if (this.y <= 0||this.y >= this.parent.height||this.x <= 0||this.x >= this.parent.height) {
                this.stop();
            }
            }
        }
    }

    public stop() {
        this.removeEventForRun();
        this.parent.removeChild(this);
    }

}