class Player extends egret.Shape {
    /* 
     * 计算自机运行方向与角速度，并控制自机移动
     */
    private operatePlayerRun(cos:number, s:number) {
        switch(s) {
            case 1:
                //第一区间
                Main.player.x-=Main.playerSpeed*cos;
                Main.player.y-=Math.sqrt(Math.pow(Main.playerSpeed, 2)-Math.pow(Main.playerSpeed*cos, 2));
            ;break;
            case 2:
                //第二区间
                Main.player.x+=Main.playerSpeed*cos;
                Main.player.y-=Math.sqrt(Math.pow(Main.playerSpeed, 2)-Math.pow(Main.playerSpeed*cos, 2));
            ;break;
            case 3:
                //第三区间
                Main.player.x+=Main.playerSpeed*cos;
                Main.player.y+=Math.sqrt(Math.pow(Main.playerSpeed, 2)-Math.pow(Main.playerSpeed*cos, 2));
            ;break;
            case 4:
                //第四区间
                Main.player.x-=Main.playerSpeed*cos;
                Main.player.y+=Math.sqrt(Math.pow(Main.playerSpeed, 2)-Math.pow(Main.playerSpeed*cos, 2));
            ;break;
        }
    }
}