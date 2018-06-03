var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EnemyMoveManager = (function () {
    function EnemyMoveManager(width) {
        this.createEnemyArray(width);
    }
    EnemyMoveManager.prototype.createEnemyArray = function (width) {
        var x = width / 4;
        var ax = x;
        var bx = x * 3;
        for (var i = 0; i < 4; i++) {
            var array = [];
            for (var j = 0; j < 3; j++) {
                var enemy = new Enemy(0, 5);
                enemy.graphics.beginFill(0x0066ff, 1);
                enemy.graphics.drawRect(0, 0, Common.player.width, Common.player.width);
                enemy.graphics.endFill();
                enemy.rotation = 45;
                enemy.name = "enemy_" + i;
                if (i % 2 > 0) {
                    enemy.x = ax;
                }
                else {
                    enemy.x = bx;
                }
                array.push(enemy);
            }
            EnemyMoveManager.enemyArray.push(array);
        }
    };
    EnemyMoveManager.launch = function (i, j) {
        if (i >= 4) {
            return;
        }
        var enemy = EnemyMoveManager.enemyArray[i][j];
        enemy.y = 0;
        enemy.addEventForRun();
        Common.gameStageContainer.addChild(enemy);
        Common.gameStageContainer.setChildIndex(enemy, 3);
        j++;
        if (j >= 3) {
            j = 0;
            i++;
            setTimeout(function () {
                EnemyMoveManager.launch(i, j);
            }, 1000);
        }
        else {
            setTimeout(function () {
                EnemyMoveManager.launch(i, j);
            }, 450);
        }
    };
    EnemyMoveManager.enemyArray = [];
    return EnemyMoveManager;
}());
__reflect(EnemyMoveManager.prototype, "EnemyMoveManager");
//# sourceMappingURL=EnemyMoveManager.js.map