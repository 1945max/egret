var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var System = (function () {
    function System() {
        this.pauseTimeCount = 0;
        this.init();
    }
    System.prototype.init = function () {
        this.timer = new egret.Timer(1000, Common.mapConfigs.time);
        this.timer.addEventListener(egret.TimerEvent.TIMER, function (evt) {
            Common.gameStageContainer.pointPanel.addTime();
            Common.enemyMoveManager.operateEnemyRun(Common.system.timer.currentCount);
        }, this);
        this.startTime = egret.getTimer();
        this.timer.start();
    };
    return System;
}());
__reflect(System.prototype, "System");
//# sourceMappingURL=System.js.map