class Player extends egret.Shape {

    public speed = 1;

    public s = 1;
    /* 
     * 计算自机运行方向与角速度，并控制自机移动
     */
    public operatePlayerRun(cos:number, s:number) {
        switch(s) {
            case 1:
                //第一象限
                Main.player.x-=this.speed*cos;
                Main.player.y-=Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*cos, 2));
            ;break;
            case 2:
                //第二象限
                Main.player.x+=this.speed*cos;
                Main.player.y-=Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*cos, 2));
            ;break;
            case 3:
                //第三象限
                Main.player.x+=this.speed*cos;
                Main.player.y+=Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*cos, 2));
            ;break;
            case 4:
                //第四象限
                Main.player.x-=this.speed*cos;
                Main.player.y+=Math.sqrt(Math.pow(this.speed, 2)-Math.pow(this.speed*cos, 2));
            ;break;
        }
    }
}