var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EnemyMoveManager = (function () {
    function EnemyMoveManager() {
        this.enemyArray = [];
        this.createEnemyArray();
    }
    EnemyMoveManager.prototype.createEnemyArray = function () {
        for (var i = 0; i < 10; i++) {
            var enemy = new Enemy(0, 5);
            enemy.graphics.beginFill(0x0066ff, 1);
            enemy.graphics.drawRect(0, 0, Main.player.width, Main.player.width * 2);
            enemy.graphics.endFill();
            this.enemyArray.push(enemy);
        }
    };
    EnemyMoveManager.prototype.launch = function () {
        var enemy = this.enemyArray.pop();
        enemy.y = -1 * enemy.height;
        enemy.x = 300;
        Main.gameStageContainer.addChild(enemy);
        this.launchId = setTimeout(this.launch, 500);
    };
    return EnemyMoveManager;
}());
__reflect(EnemyMoveManager.prototype, "EnemyMoveManager");
//# sourceMappingURL=EnemyMoveManager.js.map