/**
 * 游戏场景对象
 * 
*/
class GameStageContainer extends egret.DisplayObjectContainer {


    public pointPanel:PointPanel;

    public pausePanel:PausePanel;

    public constructor(x:number, y:number, width:number, height:number) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.createScreen(width, height);
        this.createPointPanel(width, height);
        this.createPausePanel(width, height);
    }

    private createScreen(width:number, height:number) {
        let screen = new egret.Shape();
        screen.graphics.beginFill(0x444444, 1);
        screen.graphics.drawRect(0, 0, width, height);
        screen.graphics.endFill();
        this.addChild(screen);
        this.setChildIndex(screen, 1);
    }

    private createPointPanel(width:number, height:number) {
        this.pointPanel = new PointPanel(0, 0, width, height);
        this.addChild(this.pointPanel);
        this.setChildIndex(this.pointPanel, 100);
    }

    private createPausePanel(width:number, height:number) {
        this.pausePanel = new PausePanel(0, 0, width, height);
    }

}

class PausePanel extends egret.DisplayObjectContainer {

    public textField:egret.TextField;

    public constructor(x:number, y:number, width:number, height:number) {
        super();
        let bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.5);
        bg.graphics.drawRect(0, 0, width, height);
        bg.graphics.endFill();
        this.addChild(bg);
        this.textField = new egret.TextField();
        this.textField.text = "PAUSE";
        this.textField.size = 100;
        this.textField.textColor = 0xffffff;
        this.textField.x = (width - this.textField.width)/2;
        this.textField.y = (height - this.textField.height)/2;
        this.addChild(this.textField);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public show() {
        if (Common.gameStageContainer.contains(this)) {
            Common.gameStageContainer.removeChild(this);
            // egret.Tween.get(this).to({y:this.height}, 1000, egret.Ease.backInOut).call(function() {
            // });
        } else {
            Common.gameStageContainer.addChild(this);
            // egret.Tween.get(this).to({y:0}, 1000, egret.Ease.backInOut);
        }   
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
        this.setChildIndex(point, 3);
        let time = new  egret.TextField();
        time.text = this.timeStr + "";
        time.size = 40;
        time.textColor = 0xfffeee;
        time.x = this.width - 10 - time.width;
        time.y = 10;
        this.addChild(time);
        this.setChildIndex(time, 3);
        for (var i = 0;i < this.HP;i++) {
            let hrBox = new egret.Shape();
            hrBox.graphics.beginFill(0xff0000, 1);
            hrBox.graphics.drawRect(10, this.height - 10 - 20, 40, 20);
            hrBox.graphics.endFill();
            hrBox.x += 40*i + 10*i;
            this.addChild(hrBox);
            this.setChildIndex(hrBox, 3);
            this.HPArray.push(hrBox);

            let boomBox = new egret.Shape();
            boomBox.graphics.beginFill(0x6666ff, 1);
            boomBox.graphics.drawRect(this.width - 150, this.height - 10 - 20, 40, 20);
            boomBox.graphics.endFill();
            boomBox.x += 40*i + 10*i;
            this.addChild(boomBox);
            this.setChildIndex(boomBox, 3);
            this.boomArray.push(boomBox);
        }
    }

    public removeBoom() {
       this.boom--;
       for (var boom of this.boomArray) {
            if (boom.parent) {
                boom.parent.removeChild(boom);
                return;
            }
       }
    }

    public addBoom() {
       this.boom++;
       for (var i = this.boomArray.length-1;i>=0;i--) {
            if (!this.boomArray[i].parent) {
                this.boomArray[i].parent.addChild(this.boomArray[i]);
                return;
            }
       }
    }

    public removeHP() {
       this.HP--;
       for (var hp of this.HPArray) {
            if (hp.parent) {
                hp.parent.removeChild(hp);
                return;
            }
       }
    }

    public addHP() {
       this.HP++;
       for (var i = this.HPArray.length-1;i>=0;i--) {
            if (!this.HPArray[i].parent) {
                this.HPArray[i].parent.addChild(this.HPArray[i]);
                return;
            }
       }
    }

}