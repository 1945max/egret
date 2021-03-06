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
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI(this.stage.stageWidth, this.stage.stageHeight);
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 1, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        Main.stageWidth = this.stage.stageWidth;
        Main.stageHeight = this.stage.stageHeight;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x848484, 1);
        bg.graphics.drawRect(0, 0, Main.stageWidth, Main.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
        /******************游戏窗口***********************/
        var gameStage = new egret.Shape();
        gameStage.graphics.beginFill(0x000000, 1);
        gameStage.graphics.drawRoundRect(20, 20, Main.stageWidth - 40, Main.stageWidth - 40, 40, 40);
        gameStage.graphics.endFill();
        this.addChild(gameStage);
        Common.gameStageContainer = new GameStageContainer(40, 40, Main.stageWidth - 80, Main.stageWidth - 80);
        this.addChild(Common.gameStageContainer);
        var player = new Player();
        player.graphics.beginFill(0x33cc33, 1);
        player.graphics.drawCircle(0, 0, 20);
        player.graphics.endFill();
        player.x = Common.gameStageContainer.width / 2;
        player.y = Common.gameStageContainer.height - 50;
        Common.player = player;
        Common.gameStageContainer.addChild(player);
        Common.gameStageContainer.setChildIndex(player, 20);
        Common.gameStageContainer.swapChildren(player, Common.gameStageContainer.pointPanel);
        var screen = new egret.Shape();
        screen.graphics.beginFill(0x000000, 1);
        screen.graphics.drawRect(0, 0, Common.gameStageContainer.width, Common.gameStageContainer.height);
        screen.graphics.endFill();
        screen.x = Common.gameStageContainer.x;
        screen.y = Common.gameStageContainer.y;
        this.addChild(screen);
        Common.gameStageContainer.mask = screen;
        /******************游戏窗口***********************/
        /******************方向摇杆***********************/
        var rockerRadius = Main.stageWidth / 6;
        Main.rockerX = rockerRadius + 40;
        Main.rockerY = rockerRadius * 7 + 20;
        var rocker1 = new egret.Shape();
        rocker1.graphics.beginFill(0x000000, 1);
        rocker1.graphics.drawCircle(0, 0, rockerRadius);
        rocker1.graphics.endFill();
        rocker1.x = Main.rockerX;
        rocker1.y = Main.rockerY;
        this.addChild(rocker1);
        var rocker2 = new egret.Shape();
        var rockerRadius2 = rockerRadius - 40;
        rocker2.graphics.beginFill(0xe80000, 1);
        rocker2.graphics.drawCircle(0, 0, rockerRadius2);
        rocker2.graphics.endFill();
        rocker2.x = Main.rockerX;
        rocker2.y = Main.rockerY;
        this.addChild(rocker2);
        rocker2.touchEnabled = true;
        rocker2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            this.rockerEvent(evt, rockerRadius2, rocker2);
        }, this);
        rocker2.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (evt) {
            this.rockerEvent(evt, rockerRadius2, rocker2);
        }, this);
        rocker2.addEventListener(egret.TouchEvent.TOUCH_END, function (evt) {
            rocker2.x = Main.rockerX;
            rocker2.y = Main.rockerY;
            var b = Math.abs(evt.stageX - Main.rockerX);
            var a = Math.abs(evt.stageY - Main.rockerY);
            var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            var cos = b / c;
            Common.player.setOption(cos, evt.stageX, evt.stageY, Main.rockerX, Main.rockerY);
            Common.player.removeEventForRun();
        }, this);
        rocker2.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function (evt) {
            rocker2.x = Main.rockerX;
            rocker2.y = Main.rockerY;
            var b = Math.abs(evt.stageX - Main.rockerX);
            var a = Math.abs(evt.stageY - Main.rockerY);
            var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            var cos = b / c;
            Common.player.setOption(cos, evt.stageX, evt.stageY, Main.rockerX, Main.rockerY);
            Common.player.removeEventForRun();
        }, this);
        /********************方向摇杆**********************/
        var btnA = new egret.Shape();
        btnA.graphics.beginFill(0xe80000, 1);
        btnA.graphics.drawCircle(Main.stageWidth - rockerRadius + 20, rockerRadius * 7 - 20, rockerRadius - 40);
        btnA.graphics.endFill();
        btnA.touchEnabled = true;
        btnA.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            btnA.alpha = 0.5;
            if (Common.FRAME_STATUS) {
                Common.player.longShoot();
            }
        }, this);
        btnA.addEventListener(egret.TouchEvent.TOUCH_END, function (evt) {
            btnA.alpha = 1;
            if (Common.FRAME_STATUS) {
                Common.player.stopShoot();
            }
        }, this);
        this.addChild(btnA);
        var btnB = new egret.Shape();
        btnB.graphics.beginFill(0xe80000, 1);
        btnB.graphics.drawCircle(Main.stageWidth - rockerRadius + 20 - (rockerRadius * 2 - 80), rockerRadius * 7 + rockerRadius * 2 - 120, rockerRadius - 40);
        btnB.graphics.endFill();
        btnB.touchEnabled = true;
        btnB.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            btnB.alpha = 0.5;
            if (Common.FRAME_STATUS) {
                Common.player.boom();
            }
        }, this);
        btnB.addEventListener(egret.TouchEvent.TOUCH_END, function (evt) {
            btnB.alpha = 1;
        }, this);
        this.addChild(btnB);
        var btnStart = new egret.Shape();
        btnStart.graphics.beginFill(0xc2c2c2, 1);
        btnStart.graphics.drawRoundRect(0, 0, 40, rockerRadius, 20, 20);
        btnStart.graphics.endFill();
        btnStart.rotation = -30;
        btnStart.x = Main.stageWidth / 2 - 140;
        btnStart.y = Main.stageHeight - rockerRadius - 20;
        this.addChild(btnStart);
        btnStart.touchEnabled = true;
        btnStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            if (Common.GAME_STATUS) {
                if (!Common.FRAME_STATUS) {
                    Common.system.timer.start();
                    Main.soundChannel = Main.sound.play(0, -1);
                    setTimeout(function () {
                        Common.FRAME_STATUS = !Common.FRAME_STATUS;
                    }, Common.system.dely);
                    Common.system.pauseTimeCount = Common.system.pauseTimeCount + egret.getTimer() - Common.system.pauseTime;
                }
                else {
                    Common.system.timer.stop();
                    Main.soundChannel.stop();
                    Common.system.pauseTime = egret.getTimer();
                    Common.system.dely = (egret.getTimer() - Common.system.startTime - Common.system.pauseTimeCount) % 1000;
                    Common.FRAME_STATUS = !Common.FRAME_STATUS;
                }
                Common.gameStageContainer.pausePanel.show();
            }
            btnStart.alpha = 0.5;
        }, this);
        btnStart.addEventListener(egret.TouchEvent.TOUCH_END, function (evt) {
            btnStart.alpha = 1;
        }, this);
        this.addChild(btnB);
        var btnSelect = new egret.Shape();
        btnSelect.graphics.beginFill(0xc2c2c2, 1);
        btnSelect.graphics.drawRoundRect(0, 0, 40, rockerRadius, 20, 20);
        btnSelect.graphics.endFill();
        btnSelect.rotation = -30;
        btnSelect.x = Main.stageWidth / 2 - 60;
        btnSelect.y = Main.stageHeight - rockerRadius - 20;
        this.addChild(btnSelect);
        Common.mapConfigs = RES.getRes("mapConfig_json");
        Common.enemyMoveManager = new EnemyMoveManager();
        Common.system = new System();
        this.playBgm();
    };
    Main.prototype.playBgm = function () {
        Main.sound = RES.getRes("bgm_mp3");
        Main.soundChannel = Main.sound.play(0, -1);
    };
    Main.prototype.rockerEvent = function (evt, rockerRadius2, rocker2) {
        var b = Math.abs(evt.stageX - Main.rockerX);
        var a = Math.abs(evt.stageY - Main.rockerY);
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        var cos = b / c;
        if (rockerRadius2 < c) {
            var bL = rockerRadius2 * cos;
            var aL = Math.sqrt(Math.pow(rockerRadius2, 2) - Math.pow(bL, 2));
            if ((evt.stageX - Main.rockerX) > 0) {
                rocker2.x = Main.rockerX + bL;
            }
            else if ((evt.stageX - Main.rockerX) < 0) {
                rocker2.x = Main.rockerX - bL;
            }
            else {
                rocker2.x = Main.rockerX;
            }
            if ((evt.stageY - Main.rockerY) > 0) {
                rocker2.y = Main.rockerY + aL;
            }
            else if ((evt.stageY - Main.rockerY) < 0) {
                rocker2.y = Main.rockerY - aL;
            }
            else {
                rocker2.y = Main.rockerY;
            }
        }
        else {
            rocker2.x = evt.stageX;
            rocker2.y = evt.stageY;
        }
        Common.player.setOption(cos, evt.stageX, evt.stageY, Main.rockerX, Main.rockerY);
        Common.player.addEventForRun();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map