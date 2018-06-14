class Enemy extends egret.Shape {

    private speedX:number = 0;

    private speedY:number = 5;

    public bulletArray:Array<BulletOfEnemy> = [];

    public constructor(speedX:number, speedY:number) {
        super();
        this.speedX = speedX;
        this.speedY = speedY;
        this.createBullet();
    }

    public shoot() {
        let bullet = this.bulletArray[this.bulletArray.length-1];
        bullet.x = this.x;
        bullet.y = this.y;
        this.bulletArray.pop();
        bullet.shootToTarget(this.x, this.y, Common.player.x, Common.player.y);
    }

    private createBullet() {
        for (var i = 0;i < 10;i++) {
            let bulletOfEnemy = new BulletOfEnemy();
            bulletOfEnemy.graphics.beginFill(0x000066, 1);
            bulletOfEnemy.graphics.drawCircle(0, 0, 5);
            bulletOfEnemy.graphics.endFill();
            bulletOfEnemy.name = this.name+"-bullet_"+i;
            this.bulletArray.push(bulletOfEnemy);
        }
    }

    public addEventForRun() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.operateEnemyRun, this);
    }

    private removeEventForRun() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operateEnemyRun, this);
    }

    private operateEnemyRun() {
        if (Common.FRAME_STATUS) {
            this.x+=this.speedX;
            this.y+=this.speedY;
            if (this.y <= 0||this.y >= this.parent.height||this.x <= 0||this.x >= this.parent.height) {
                this.removeEventForRun();
                this.parent.removeChild(this);
                Common.enemyMoveManager.enemyArray.push(this);
            }
        }
        
    }

}

class BulletOfEnemy extends egret.Shape {

    private speed:number = 10;

    private speedX:number = 0;

    private speedY:number = 0;

    public shootToTarget(x:number, y:number, targetX:number, targetY:number) {
        this.x = x;
        this.y = y;
        let b = Math.abs(x - targetX);
        let a = Math.abs(y - targetY);
        let c = Math.sqrt(Math.pow(a, 2)+Math.pow(a, 2));
        let cos = b/c;
        if ((x - targetX)>0) {
            this.speedX = this.speed*cos;
        } else if ((x - targetX)<0) {
            this.speedX = -1*this.speed*cos;
        }
        if ((y - targetY)>0) {
            this.speedY = Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speedX, 2));
        } else if ((y - targetY)<0) {
            this.speedY = -1*Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speedX, 2));
        }
        this.addEventForRun();
    }

    private addEventForRun() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    }

    private removeEventForRun() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operateBulletRun, this);
    }

    private operateBulletRun() {
        if (Common.FRAME_STATUS) {
            this.x+=this.speedX;
            this.y+=this.speedY;
            if (this.y >= this.parent.height||this.x <= 0||this.x >= this.parent.height) {
                this.removeEventForRun();
                this.parent.removeChild(this);
                (this.parent.getChildByName(this.name.split("-")[0]) as Enemy).bulletArray.push(this);
            }
        }
    }

}