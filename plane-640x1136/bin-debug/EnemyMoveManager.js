var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EnemyMoveManager = (function () {
    function EnemyMoveManager() {
        this.enemyArray = [];
        this.enemyArrayRun = [];
        this.spaceX = Common.gameStageContainer.width / Common.mapConfigs.stage_width;
        this.spaceY = Math.sqrt(Math.pow(Common.player.width, 2) * 2);
        this.indexs = Common.mapConfigs.enemy_team;
        this.createEnemy();
    }
    EnemyMoveManager.prototype.createEnemy = function () {
        var configs = Common.mapConfigs;
        for (var i = 0; i < configs.enemy_count; i++) {
            var enemy = new Enemy(0, 3);
            enemy.graphics.beginFill(0x0066ff, 1);
            enemy.graphics.drawRect(0, -Common.player.width, Common.player.width, Common.player.width);
            enemy.graphics.endFill();
            // enemy.rotation = 45;
            enemy.name = "enemy_" + i;
            this.enemyArray.push(enemy);
        }
    };
    EnemyMoveManager.prototype.operateEnemyRun = function (time) {
        if (this.indexs.length > 0 && this.indexs[this.indexs.length - 1].time == time) {
            var index = this.indexs.pop();
            for (var i = 0; i < index.enemy.length; i++) {
                var enemy = this.enemyArray.pop();
                this.enemyArrayRun.push(enemy);
                enemy.y = 0;
                enemy.x = this.spaceX * index.enemy[i] - this.spaceY / 2;
                Common.gameStageContainer.addChild(enemy);
                enemy.addEventForRun();
            }
        }
    };
    return EnemyMoveManager;
}());
__reflect(EnemyMoveManager.prototype, "EnemyMoveManager");
//# sourceMappingURL=EnemyMoveManager.js.map