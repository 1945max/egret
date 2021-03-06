class Enemy extends egret.Shape {

    private speedX:number = 0;

    private speedY:number = 5;

    public bulletArray:Array<BulletOfEnemy> = [];

    public constructor(speedX:number, speedY:number) {
        super();
        this.speedX = speedX;
        this.speedY = speedY;
    }

    private shoot(current:Enemy) {
        if (Common.enemyMoveManager.bulletArray.length>0) {
            let enemyBullet = Common.enemyMoveManager.bulletArray.pop();
            enemyBullet.x = current.x;
            enemyBullet.y = current.y;
            Common.gameStageContainer.addChild(enemyBullet);
            enemyBullet.shootToTarget(enemyBullet.x, enemyBullet.y, Common.player.x+Common.player.width/2, Common.player.y+Common.player.height/2);
        }
    }

    public addEventForRun() {
        let enemyX = this.x;
        let enemyY = this.y;
        setTimeout(this.shoot(this), 2000);
        this.addEventListener(egret.Event.ENTER_FRAME, this.operateEnemyRun, this);
    }

    private removeEventForRun() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.operateEnemyRun, this);
    }

    private operateEnemyRun() {
        if (Common.FRAME_STATUS) {
            this.x+=this.speedX;
            this.y+=this.speedY;
            if (null != this.parent) {
            if (this.y <= 0||this.y >= this.parent.height||this.x <= 0||this.x >= this.parent.height) {
                this.stop();
            }
            }
            Common.hit(Common.player, this);
        }
        
    }

    public stop() {
        this.removeEventForRun();
        this.parent.removeChild(this);
        Common.enemyMoveManager.enemyArray.push(this);
        delete Common.enemyMoveManager.enemyArrayRun[Common.enemyMoveManager.enemyArrayRun.indexOf(this)]
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
        if (x > targetX) {
            this.speedX = -1*this.speed*cos;
        } else if (x < targetX) {
            this.speedX = this.speed*cos;
        }
        if (y > targetY) {
            this.speedY = -1*Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speedX, 2));
        } else if (y < targetY) {
            this.speedY = Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speedX, 2));
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
            if (this.parent) {
            if (this.y >= this.parent.height||this.x <= 0||this.x >= this.parent.height) {
                this.removeEventForRun();
                this.parent.removeChild(this);
                Common.enemyMoveManager.bulletArray.push(this);
            }
            Common.hit(Common.player, this);
            }
        }
    }

}