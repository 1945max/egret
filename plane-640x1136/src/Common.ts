class Common {

    public static GAME_STATUS:boolean = true;
    
    public static FRAME_STATUS:boolean = true;

    public static gameStageContainer:GameStageContainer;

    public static enemyMoveManager:EnemyMoveManager;

    public static player:Player;

    public static enemyMoveManagerId:number;

    public static mapConfigs;

    public static system:System;

    static boom(obj1:Enemy, obj2:Boom) {
        if (Common.hitTestP(obj1, obj2)) {
            console.log("碰撞类型boom...");
                obj1.stop();
                obj2.stop();
                let boom = new egret.Shape();
                boom.graphics.beginFill(0xffff00, 1);
                boom.graphics.drawCircle(0, 0, 10);
                boom.graphics.endFill();
                if (obj1.x>obj2.x) {
                    boom.x = (obj1.x-obj2.x)/2+obj2.x;
                } else {
                    boom.x = (obj2.x-obj2.x)/2+obj2.x;
                }
                if (obj1.y>obj2.y) {
                    boom.y = (obj1.y-obj2.y)/2+obj2.y;
                } else {
                    boom.y = (obj2.y-obj1.y)/2+obj1.y;
                }
                Common.gameStageContainer.addChild(boom);
                egret.Tween.get(boom).to({scaleX:5, scaleY:5}, 500).call(function() {
                    Common.gameStageContainer.removeChild(boom);
                });
            }
    }

    static shoot(obj1:Enemy, obj2:Bullet) {
        if (Common.hitTestP(obj1, obj2)) {
                console.log("碰撞类型shoot...");
                obj1.stop();
                obj2.stop();
                // Common.gameStageContainer.removeChild(obj1);
                // Common.gameStageContainer.removeChild(obj2);
                let boom = new egret.Shape();
                boom.graphics.beginFill(0xffff00, 1);
                boom.graphics.drawCircle(0, 0, 10);
                boom.graphics.endFill();
                if (obj1.x>obj2.x) {
                    boom.x = (obj1.x-obj2.x)/2+obj2.x;
                } else {
                    boom.x = (obj2.x-obj2.x)/2+obj2.x;
                }
                if (obj1.y>obj2.y) {
                    boom.y = (obj1.y-obj2.y)/2+obj2.y;
                } else {
                    boom.y = (obj2.y-obj1.y)/2+obj1.y;
                }
                Common.gameStageContainer.addChild(boom);
                egret.Tween.get(boom).to({scaleX:5, scaleY:5}, 500).call(function() {
                    Common.gameStageContainer.removeChild(boom);
                });
                Common.gameStageContainer.pointPanel.addPoint();
            }
    }

    static hit(obj1:Player, obj2:Enemy) {
        if (!Common.player.invincibleStatus && Common.hitTestP(obj1, obj2)) {
                if (Common.gameStageContainer.pointPanel.HP == 0) {
                    Common.gameOver(obj1, obj2);
                } else {
                    Common.player.invincibleStatus = true;
                    let bruiseSound:egret.Sound = RES.getRes("bruise_mp3");
                    bruiseSound.play(0, 1);
                    egret.Tween.get(Common.player).to({alpha:0.3}, 250).to({alpha:1}, 250).to({alpha:0.3}, 250).to({alpha:1}, 250)
                    .to({alpha:0.3}, 250).to({alpha:1}, 250).to({alpha:0.3}, 250).to({alpha:1}, 250)
                    .to({alpha:0.3}, 250).to({alpha:1}, 250).to({alpha:0.3}, 250).to({alpha:1}, 250)
                    .call(function() {
                        Common.player.invincibleStatus = false;
                    });
                    Common.gameStageContainer.pointPanel.removeHP();
                }
            }
    }

    static gameOver(obj1:Player, obj2:Enemy) {
        Common.FRAME_STATUS = false;
                Common.system.timer.stop();
                Common.gameStageContainer.removeChild(obj1);
                Common.gameStageContainer.removeChild(obj2);
                let boom = new egret.Shape();
                boom.graphics.beginFill(0xffff00, 1);
                boom.graphics.drawCircle(0, 0, 10);
                boom.graphics.endFill();
                if (obj1.x>obj2.x) {
                    boom.x = (obj1.x-obj2.x)/2+obj2.x;
                } else {
                    boom.x = (obj2.x-obj2.x)/2+obj2.x;
                }
                if (obj1.y>obj2.y) {
                    boom.y = (obj1.y-obj2.y)/2+obj2.y;
                } else {
                    boom.y = (obj2.y-obj1.y)/2+obj1.y;
                }
                Common.gameStageContainer.addChild(boom);
                egret.Tween.get(boom).to({scaleX:5, scaleY:5}, 500).call(function() {
                    Common.gameStageContainer.removeChild(boom);
                    Common.gameStageContainer.gameOverPanel.show();
                });
                Main.soundChannel.stop();
                Common.player.soundBoom.play(0,1);
    }

    static hitTestP(obj1: egret.DisplayObject,obj2: egret.DisplayObject): boolean {
        if (obj1&&obj2) {
        var rect1:egret.Rectangle = obj1.getBounds();//获取显示对象的测量边界
        var rect2:egret.Rectangle = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
        return rect1.intersects(rect2);

        }
    }
    
}