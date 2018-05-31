//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource();
        this.createGameScene();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 1, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    public static stageHeight:number;

    public static stageWidth:number;

    public static rockerX:number;
    public static rockerY:number;

    public static player:Player;

    public static playerSpeed = 1;

    public static gameStageContainer:GameStageContainer;

    public static soundChannel:egret.SoundChannel;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        Main.stageWidth = this.stage.stageWidth;
        Main.stageHeight = this.stage.stageHeight;

        let bg = new egret.Shape();
        bg.graphics.beginFill(0x848484, 1);
        bg.graphics.drawRect(0, 0, Main.stageWidth, Main.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);

        /******************游戏窗口***********************/

        let gameStage = new egret.Shape();
        gameStage.graphics.beginFill(0x000000, 1);
        gameStage.graphics.drawRoundRect(20, 20, Main.stageWidth-40, Main.stageWidth-40, 40, 40);
        gameStage.graphics.endFill();
        this.addChild(gameStage);

        Main.gameStageContainer = new GameStageContainer(40, 40, Main.stageWidth-80, Main.stageWidth-80);
        this.addChild(Main.gameStageContainer);

        let player = new Player();
        player.graphics.beginFill(0x33cc33, 1);
        player.graphics.drawCircle(0, 0, 20);
        player.graphics.endFill();
        player.x = Main.gameStageContainer.width/2;
        player.y = Main.gameStageContainer.height-50;
        Main.player = player;
        Main.gameStageContainer.addChild(player);
        Main.gameStageContainer.setChildIndex(player, 20);
        Main.gameStageContainer.swapChildren(player, Main.gameStageContainer.pointPanel);

        /******************游戏窗口***********************/

        
        /******************方向摇杆***********************/
        let rockerRadius = Main.stageWidth/6;
        Main.rockerX = rockerRadius+40;
        Main.rockerY = rockerRadius*7+20;

        let rocker1 = new egret.Shape();
        rocker1.graphics.beginFill(0x000000, 1);
        rocker1.graphics.drawCircle(0, 0, rockerRadius);
        rocker1.graphics.endFill();
        rocker1.x = Main.rockerX;
        rocker1.y = Main.rockerY;
        this.addChild(rocker1);

        let rocker2 = new egret.Shape();
        let rockerRadius2 = rockerRadius-40;
        rocker2.graphics.beginFill(0xe80000, 1);
        rocker2.graphics.drawCircle(0, 0, rockerRadius2);
        rocker2.graphics.endFill();
        rocker2.x = Main.rockerX;
        rocker2.y = Main.rockerY;
        this.addChild(rocker2);

        rocker2.touchEnabled = true;
        rocker2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(evt:egret.TouchEvent):void {
            this.rockerEvent(evt, rockerRadius2,  rocker2);
        }, this);
       rocker2.addEventListener(egret.TouchEvent.TOUCH_MOVE, function(evt:egret.TouchEvent):void {
            this.rockerEvent(evt, rockerRadius2,  rocker2);
        }, this);
        rocker2.addEventListener(egret.TouchEvent.TOUCH_END, function(evt:egret.TouchEvent):void {
            rocker2.x = Main.rockerX;
            rocker2.y = Main.rockerY;
            let b = Math.abs(evt.stageX - Main.rockerX);
            let a = Math.abs(evt.stageY - Main.rockerY);
            let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b,2));
            let cos = b/c;
            Main.player.setOption(cos, evt.stageX, evt.stageY, Main.rockerX, Main.rockerY);
            Main.player.removeEventForRun();
        }, this);
        rocker2.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function(evt:egret.TouchEvent):void {
            rocker2.x = Main.rockerX;
            rocker2.y = Main.rockerY;
            let b = Math.abs(evt.stageX - Main.rockerX);
            let a = Math.abs(evt.stageY - Main.rockerY);
            let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b,2));
            let cos = b/c;
            Main.player.setOption(cos, evt.stageX, evt.stageY, Main.rockerX, Main.rockerY);
            Main.player.removeEventForRun();
        }, this);
        /********************方向摇杆**********************/

        let btnA = new egret.Shape();
        btnA.graphics.beginFill(0xe80000, 1);
        btnA.graphics.drawCircle(Main.stageWidth-rockerRadius+20, rockerRadius*7-20, rockerRadius-40);
        btnA.graphics.endFill();
        btnA.touchEnabled = true;
        btnA.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(evt:egret.TouchEvent):void {
            btnA.alpha = 0.5;
            Main.player.longShoot();
        }, this);
        btnA.addEventListener(egret.TouchEvent.TOUCH_END, function(evt:egret.TouchEvent):void {
            btnA.alpha = 1;
            Main.player.stopShoot();
        }, this);
        this.addChild(btnA);

        let btnB = new egret.Shape();
        btnB.graphics.beginFill(0xe80000, 1);
        btnB.graphics.drawCircle(Main.stageWidth-rockerRadius+20-(rockerRadius*2-80), rockerRadius*7+rockerRadius*2-120, rockerRadius-40);
        btnB.graphics.endFill();
        this.addChild(btnB);

        let btnStart = new egret.Shape();
        btnStart.graphics.beginFill(0xc2c2c2, 1);
        btnStart.graphics.drawRoundRect(0, 0, 40, rockerRadius, 20, 20);
        btnStart.graphics.endFill();
        btnStart.rotation = -30;
        btnStart.x = Main.stageWidth/2-140;
        btnStart.y = Main.stageHeight-rockerRadius-20;
        this.addChild(btnStart);

        let btnSelect = new egret.Shape();
        btnSelect.graphics.beginFill(0xc2c2c2, 1);
        btnSelect.graphics.drawRoundRect(0, 0, 40, rockerRadius, 20, 20);
        btnSelect.graphics.endFill();
        btnSelect.rotation = -30;
        btnSelect.x = Main.stageWidth/2-60;
        btnSelect.y = Main.stageHeight-rockerRadius-20;
        this.addChild(btnSelect);
        let sound:egret.Sound = RES.getRes("bgm_mp3");
        Main.soundChannel = sound.play(0, -1);
        
    }

    private rockerEvent(evt:egret.TouchEvent, rockerRadius2:number, rocker2:egret.Shape) {
        let b = Math.abs(evt.stageX - Main.rockerX);
            let a = Math.abs(evt.stageY - Main.rockerY);
            let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b,2));
            let cos = b/c;
            if (rockerRadius2 < c) {
                let bL=rockerRadius2*cos;
                let aL=Math.sqrt(Math.pow(rockerRadius2, 2) - Math.pow(bL, 2));
                if ((evt.stageX - Main.rockerX)>0) {
                    rocker2.x = Main.rockerX + bL;
                } else if ((evt.stageX - Main.rockerX)<0) {
                    rocker2.x = Main.rockerX - bL;
                } else {
                    rocker2.x = Main.rockerX;
                }
                if ((evt.stageY - Main.rockerY)>0) {
                    rocker2.y = Main.rockerY + aL;
                } else if ((evt.stageY - Main.rockerY)<0) {
                    rocker2.y = Main.rockerY - aL;
                } else {
                    rocker2.y = Main.rockerY;
                }
            } else {
                rocker2.x = evt.stageX;
                rocker2.y = evt.stageY;
            }
            Main.player.setOption(cos, evt.stageX, evt.stageY, Main.rockerX, Main.rockerY);
            Main.player.addEventForRun();
    }

}