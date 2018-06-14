class EnemyMoveManager {

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