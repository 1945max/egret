class Player extends egret.Shape {

    public speed = 3;

    /***角速度与运动计算相关参数***/

    public cos:number;

    public stageX:number;

    public stageY:number;

    public oX:number;

    public oY:number;

    /***角速度与运动计算相关参数***/

    public setOption(cos:number, stageX:number, stageY:number, oX:number, oY:number) {
        this.cos = cos;
        this.stageX = stageX;
        this.stageY = stageY;
        this.oX = oX;
        this.oY = oY;
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
        if (!Main.player.hasEventListener(egret.Event.ENTER_FRAME)) {
            Main.player.addEventListener(egret.Event.ENTER_FRAME, this.operatePlayerRun, Main.player);
        }
    };

    /**
     * 移除对帧事件监听
     * 
    */
    public removeEventForRun() {
        Main.player.removeEventListener(egret.Event.ENTER_FRAME, this.operatePlayerRun, Main.player);
    };
    /* 
     * 计算自机运行方向与角速度，并控制自机移动
     */
    public operatePlayerRun() {
        switch(this.computeQuadrant()) {
            case 1:
                //第一象限
                Main.player.x = Main.player.x - this.speed*this.cos;
                Main.player.y = Main.player.y - Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*this.cos, 2));
                this.checkBorder(this.cos);
            ;break;
            case 2:
                //第二象限
                Main.player.x = Main.player.x + this.speed*this.cos;
                Main.player.y = Main.player.y - Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*this.cos, 2));
                this.checkBorder(this.cos);
            ;break;
            case 3:
                //第三象限
                Main.player.x = Main.player.x + this.speed*this.cos;
                Main.player.y = Main.player.y + Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*this.cos, 2));
                this.checkBorder(this.cos);
            ;break;
            case 4:
                //第四象限
                Main.player.x = Main.player.x - this.speed*this.cos;
                Main.player.y = Main.player.y + Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*this.cos, 2));
                this.checkBorder(this.cos);
            ;break;
            default:
                //y轴无速度
                if ((this.stageX - this.oX)>0) {
                    Main.player.x+=this.speed
                } else if ((this.stageX - this.oX)<0) {
                    Main.player.x-=this.speed
                }
                //x轴无速度
                if ((this.stageY - this.oY)>0) {
                    Main.player.y+=this.speed
                } else if ((this.stageY - this.oY)<0) {
                    Main.player.y-=this.speed
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