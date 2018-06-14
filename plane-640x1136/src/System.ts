class System {

    public constructor() {
        this.init();
    }

    private init() {
        let timer = new egret.Timer(1000, Common.mapConfigs.time);
        timer.addEventListener(egret.TimerEvent.TIMER, function(evt:egret.TimerEvent):void {
            Common.enemyMoveManager.operateEnemyRun(timer.currentCount);
        }, this);
        timer.start();
    }

}