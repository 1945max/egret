class EnemyMoveManager {

    
    // private enemyArray:Array<Array<Enemy>> = [];

    // private launchId:number;

    

    // private createEnemyArray(width:number) {
    //     let x = width/4;
    //     let ax = x;
    //     let bx = x*3;
    //     for (var i = 0;i < 4;i++) {
    //         let array:Array<Enemy> = [];
    //         for (var j = 0;j<3;j++) {
    //             let enemy = new Enemy(0, 5);
    //             enemy.graphics.beginFill(0x0066ff, 1);
    //             enemy.graphics.drawRect(0, 0, Common.player.width, Common.player.width);
    //             enemy.graphics.endFill();
    //             enemy.rotation = 45;
    //             enemy.name = "enemy_"+i;
    //             if (i%2>0) {
    //                 enemy.x = ax;
    //             } else {
    //                 enemy.x = bx;
    //             }
    //             array.push(enemy);
    //         }
    //         this.enemyArray.push(array);
    //     }
    // }

    // public launch() {
    //     var leftRightFlag:boolean = false;
    //     let leftX = Common.gameStageContainer.width/4;
    //     let rightX = leftX*3; 
    //     var x = 0;
    //     let space = Math.sqrt(Math.pow(this.enemyArray[0][0].width, 2)*2)+10;
    //     this.enemyArray.every((team, i, arrayI) => {
    //         if (leftRightFlag) {
    //             x = leftX;
    //         } else {
    //             x = rightX;
    //         }
    //         team.every((enemy, j, arrayJ) => {
    //             enemy.x = x;
    //             enemy.y = (space*i*3+space*j);
    //             console.log(i+"_"+j+"_"+enemy.x+"_"+enemy.y);
    //             Common.gameStageContainer.addChild(enemy);
    //             enemy.addEventForRun();
    //             return j<team.length;
    //         });
    //         leftRightFlag=!leftRightFlag;
    //         return i<this.enemyArray.length;
    //     });
    // }

    public enemyArray:Array<Enemy> = [];

    private spaceX:number;

    private spaceY:number;

    private indexs;

    public constructor() {
        this.spaceX = Common.gameStageContainer.width/Common.mapConfigs.stage_width;
        this.spaceY = Math.sqrt(Math.pow(Common.player.width, 2)*2);
        this.indexs = Common.mapConfigs.enemy_team;
        this.createEnemy();
    }

    public createEnemy() {
        let configs = Common.mapConfigs;
        for (var i = 0;i < configs.enemy_count;i++) {
            let enemy = new Enemy(0, 4);
            enemy.graphics.beginFill(0x0066ff, 1);
            enemy.graphics.drawRect(0, -Common.player.width, Common.player.width, Common.player.width);
            enemy.graphics.endFill();
            enemy.rotation = 45;
            enemy.name = "enemy_"+i;
            this.enemyArray.push(enemy);
        }
    }

    public operateEnemyRun(time) {
        if (this.indexs.length>0&&this.indexs[this.indexs.length-1].time==time) {
            let indexs = this.indexs.pop();
            for (var i = 0;i < indexs.enemy.length;i++) {
                let enemy = this.enemyArray.pop();
                // enemy.y = -this.spaceY;
                enemy.y = 0;
                enemy.x = this.spaceX*indexs.enemy[i]-this.spaceY/2;
                console.log(enemy.x+"_"+enemy.y);
                Common.gameStageContainer.addChild(enemy);
                enemy.addEventForRun();
            }
        }
    }

}