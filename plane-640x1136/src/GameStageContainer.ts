/**
 * 游戏场景对象
 * 
*/
class GameStageContainer extends egret.DisplayObjectContainer {

    public constructor(x:number, y:number, width:number, height:number) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.createScreen(width, height);
        this.createPointPanel(width, height);
    }

    private createScreen(width:number, height:number) {
        let screen = new egret.Shape();
        screen.graphics.beginFill(0xeeeeee, 1);
        screen.graphics.drawRect(0, 0, width, height);
        screen.graphics.endFill();
        this.addChild(screen);
    }

    private createPointPanel(width:number, height:number) {
        let pointPanel = new PointPanel(0, 0, width/4, height);
        let point = new  egret.TextField();
        point.text = "得分:"+pointPanel.point;
        point.size = 30;
        point.textColor = 0x2f2e30;
        point.x = 10;
        point.y = 10;
        pointPanel.addChild(point);
        this.addChild(pointPanel);
    }

}

/**
 * 参数面板对象
 * 
*/
class PointPanel extends egret.DisplayObjectContainer {

    public point:number = 0;
    
    public time = new egret.Timer(1000, -1);

    public timeStr:number = 0;

    public HP:number = 3;

    public boom:number = 3;

    public constructor(x:number, y:number, width:number, height:number) {
        super();
        this.x = x;
        this.y = y;
        this.width = width/4;
        this.height = height;
    }

}