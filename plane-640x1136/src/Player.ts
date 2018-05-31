/**
 * 自机对象
 * 
*/
class Player extends egret.Shape {

    private speed = 5;

    public bulletArray:Bullet;

    private shooting:boolean = false;

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
    }

    public setOption(cos:number, stageX:number, stageY:number, oX:number, oY:number) {
        this.cos = cos;
        this.stageX = stageX;
        this.stageY = stageY;
        this.oX = oX;
        this.oY = oY;
    }

    public shoot() {
        if (!this.shooting) {
            let currentBullet:Bullet = this.bulletArray;
            while(null != currentBullet) {
                currentBullet.x = this.x;
                currentBullet.y = this.y;
                currentBullet.addEventForRun();
                Main.gameStageContainer.addChild(currentBullet);
                currentBullet = currentBullet.nextBullet;
            }
            this.shooting = true;
        }
    }

    public stopShoot() {
        let currentBullet:Bullet = this.bulletArray;
        while(null != currentBullet) {
            currentBullet.x = this.x;
            currentBullet.y = this.y;
            currentBullet.removeEventForRun();
            Main.gameStageContainer.removeChild(currentBullet);
            currentBullet = currentBullet.nextBullet;
        }
    }

    private createBulletArray() {
        let previousBullet:Bullet = null;
        for (var i = 0;i < 10;i++) {
            let bullet = new Bullet();
            bullet.graphics.beginFill(0xff6699, 1);
            bullet.graphics.drawCircle(0, 0, 5);
            bullet.graphics.endFill();
            if (9 == i) {
                bullet.nextBullet = this.bulletArray;
            }
            if (null == previousBullet) {
                this.bulletArray = previousBullet = bullet;
            } else {
                previousBullet.nextBullet = bullet;
            }
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

    public speed = 3;

    public addEventForRun() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    }

    public removeEventForRun() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    }

    private operateBulletRun() {
        this.y -= this.speed;
        if (this.y < 0) {
            this.y = Main.player.y;
            this.x = Main.player.x;
        }
    }

}