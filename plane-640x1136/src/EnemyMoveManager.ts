class EnemyMoveManager {

    static enemyArray:Array<Array<Enemy>> = [];

    private launchId:number;

    public constructor(width:number) {
        this.createEnemyArray(width);
    }

    private createEnemyArray(width:number) {
        let x = width/4;
        let ax = x;
        let bx = x*3;
        for (var i = 0;i < 4;i++) {
            let array:Array<Enemy> = [];
            for (var j = 0;j<3;j++) {
                let enemy = new Enemy(0, 5);
                enemy.graphics.beginFill(0x0066ff, 1);
                enemy.graphics.drawRect(0, 0, Common.player.width, Common.player.width);
                enemy.graphics.endFill();
                enemy.rotation = 45;
                enemy.name = "enemy_"+i;
                if (i%2>0) {
                    enemy.x = ax;
                } else {
                    enemy.x = bx;
                }
                array.push(enemy);
            }
            EnemyMoveManager.enemyArray.push(array);
        }
    }

    static launch(i:number, j:number) {
        if (i>=4) {
            return;
        }
        let enemy = EnemyMoveManager.enemyArray[i][j];
        enemy.y = 0;
        enemy.addEventForRun();
        Common.gameStageContainer.addChild(enemy);
        Common.gameStageContainer.setChildIndex(enemy, 3);
        j++;
        if (j>=3) {
            j = 0;
            i++;
            setTimeout(function() {
                EnemyMoveManager.launch(i, j);
            }, 1000);
        } else {
            setTimeout(function() {
                EnemyMoveManager.launch(i, j);
            }, 450);
        }
    }

}