class System {

    public timer:egret.Timer;

    public startTime:number;

    public dely:number;

    public pauseTime:number;

    public pauseTimeCount = 0;

    public constructor() {
        this.init();
    }

    private init() {
        this.timer = new egret.Timer(1000, Common.mapConfigs.time);
        this.timer.addEventListener(egret.TimerEvent.TIMER, function(evt:egret.TimerEvent):void {
            Common.enemyMoveManager.operateEnemyRun(Common.system.timer.currentCount);
        }, this);
        this.startTime = egret.getTimer();
        this.timer.start();
    }

}