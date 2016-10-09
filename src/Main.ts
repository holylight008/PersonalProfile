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

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }


    /**
     * 创建游戏场景
     * Create a game scene
     */


    private p1_animator:page;
    private p2_animator:page;

    private createGameScene():void {
        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;
        let currentY=0;
        let beginY=0;
        let currentPage=0;
        
        let p1:page01=new page01();
        p1.x=0;
        p1.y=0;
        p1.width=stageW;
        p1.height=stageH;
        this.p1_animator=p1;
        this.addChild(p1);
        p1.draw();
        
        let p2:page02=new page02();
        p2.x=0;
        p2.y=stageH;
        p2.width=stageW;
        p2.height=stageH;
        this.p2_animator=p2;
        this.addChild(p2);
        p2.draw();

        let pageArray:egret.DisplayObjectContainer[]=[p1,p2];
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,( evt:egret.TouchEvent )=>{
            beginY=evt.stageY;
        },this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,( evt:egret.TouchEvent )=>{
            currentY=evt.stageY;
            let dy=currentY-beginY;
            if(currentPage==0 && dy>=0){
                pageArray[currentPage].y+=dy/100;
            }else if(currentPage==pageArray.length-1 && dy<=0){
                pageArray[currentPage].y+=dy/100;
            }else if(dy<=0){
                pageArray[currentPage+1].y+=dy/100;
                pageArray[currentPage].y+=dy/100;
            }else{
                pageArray[currentPage].y+=dy/100;
                pageArray[currentPage-1].y+=dy/100;
            }
        },this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END,( evt:egret.TouchEvent )=>{
            currentY=evt.stageY;
            let dy=currentY-beginY;
            if(currentPage==pageArray.length-1 && dy<=0){
                egret.Tween.get(pageArray[currentPage]).to({x:0,y:0},300);
                egret.Tween.get(pageArray[currentPage-1]).to({x:0,y:-stageH},300);
            }else if(currentPage==0 && dy>=0){
                egret.Tween.get(pageArray[currentPage]).to({x:0,y:0},300);
                egret.Tween.get(pageArray[currentPage+1]).to({x:0,y:stageH},300);
            }else if(dy<=-stageH/2){
                egret.Tween.get(pageArray[currentPage]).to({x:0,y:-stageH},300);
                egret.Tween.get(pageArray[currentPage+1]).to({x:0,y:0},300);
                currentPage++;
            }else if(dy>-stageH/2 &&dy<=0){
                egret.Tween.get(pageArray[currentPage]).to({x:0,y:0},300);
                egret.Tween.get(pageArray[currentPage+1]).to({x:0,y:stageH},300);
            }else if(dy>0 && dy<stageH/2){
                egret.Tween.get(pageArray[currentPage]).to({x:0,y:0},300);
                egret.Tween.get(pageArray[currentPage-1]).to({x:0,y:-stageH},300);
            }else if(dy>=stageH/2){
                egret.Tween.get(pageArray[currentPage]).to({x:0,y:stageH},300);
                egret.Tween.get(pageArray[currentPage-1]).to({x:0,y:0},300);
                currentPage--;
            }
            console.log(currentPage);
        },this);
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
        RES.getResAsync("description_json", this.startAnimation, this);
    }
    private startAnimation(result:Array<any>):void {
        let self=this;
        self.p1_animator.change();
        self.p2_animator.change();
    }
    
}


