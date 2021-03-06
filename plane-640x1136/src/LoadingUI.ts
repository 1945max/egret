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

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor(width:number, height:number) {
        super();
        this.createView(width, height);
    }

    private textField: egret.TextField;

    private progress: egret.Shape;

    private progressb: egret.Shape;

    private createView(width:number, height:number): void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.progressb = new egret.Shape();
        this.progressb.graphics.beginFill(0x000000, 1);
        this.progressb.graphics.drawRect(0, 0, width, height/50);
        this.progressb.graphics.endFill();
        this.progressb.y =  this.textField.y +  this.textField.height + 10;
        this.addChild(this.progressb);
        this.progress = new egret.Shape();
        this.progress.y =  this.progressb.y;
    }

    public onProgress(current: number, total: number): void {
        this.textField.text = `加载中...${current}/${total}`;
        if (this.contains(this.progress)) {
            this.removeChild(this.progress);
        }
        this.progress.width = 1000;
        this.progress.graphics.beginFill(0x00cc00, 1);
        this.progress.graphics.drawRect(0, 0, (this.progressb.width/total)*current, this.progressb.height);
        this.progress.graphics.endFill();
        this.addChild(this.progress);
    }
}
