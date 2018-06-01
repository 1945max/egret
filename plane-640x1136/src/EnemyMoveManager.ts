class EnemyMoveManager {

    private enemyArray:Array<Enemy> = [];

    private launchId:number;

    public constructor() {
        this.createEnemyArray();
    }

    private createEnemyArray() {
        for (var i = 0;i < 10;i++) {
            let enemy = new Enemy(0, 5);
            enemy.graphics.beginFill(0x0066ff, 1);
            enemy.graphics.drawRect(0, 0, Main.player.width, Main.player.width*2);
            enemy.graphics.endFill();
            this.enemyArray.push(enemy);
        }
    }

    public launch() {
        let enemy = this.enemyArray.pop();
        enemy.y = -1*enemy.height;
        enemy.x = 300;
        Main.gameStageContainer.addChild(enemy);
        this.launchId = setTimeout(this.launch, 500);
    }

}