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
        screen.graphics.beginFill(0x444444, 1);
        screen.graphics.drawRect(0, 0, width, height);
        screen.graphics.endFill();
        this.addChild(screen);
    }

    private createPointPanel(width:number, height:number) {
        let pointPanel = new PointPanel(0, 0, width, height);
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

    public HPArray:Array<egret.Shape> = [];

    public boom:number = 3;

    public boomArray:Array<egret.Shape> = [];

    public constructor(x:number, y:number, width:number, height:number) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.createContent();
    }

    private createContent() {
        let point = new  egret.TextField();
        point.text = this.point + "";
        point.size = 40;
        point.textColor = 0xfff000;
        point.x = 10;
        point.y = 10;
        this.addChild(point);
        let time = new  egret.TextField();
        time.text = this.timeStr + "";
        time.size = 40;
        time.textColor = 0xfffeee;
        time.x = this.width - 10 - time.width;
        time.y = 10;
        this.addChild(time);
        for (var i = 0;i < this.HP;i++) {
            let hrBox = new egret.Shape();
            hrBox.graphics.beginFill(0xff0000, 1);
            hrBox.graphics.drawRect(10, this.height - 10 - 20, 40, 20);
            hrBox.graphics.endFill();
            hrBox.x += 40*i + 10*i;
            this.addChild(hrBox);
            this.HPArray.push(hrBox);

            let boomBox = new egret.Shape();
            boomBox.graphics.beginFill(0x6666ff, 1);
            boomBox.graphics.drawRect(this.width - 150, this.height - 10 - 20, 40, 20);
            boomBox.graphics.endFill();
            boomBox.x += 40*i + 10*i;
            this.addChild(boomBox);
            this.boomArray.push(boomBox);
        }
    }

}