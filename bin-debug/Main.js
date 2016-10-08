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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    p.createGameScene = function () {
        var currentY = 0;
        var beginY = 0;
        var currentPage = 0;
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var page01 = new egret.DisplayObjectContainer();
        page01.x = 0;
        page01.y = 0;
        page01.width = stageW;
        page01.height = stageH;
        this.addChild(page01);
        var page02 = new egret.DisplayObjectContainer();
        page02.x = 0;
        page02.y = page01.y + stageH;
        page02.width = stageW;
        page02.height = stageH;
        this.addChild(page02);
        var pageArray = [page01, page02];
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            beginY = evt.stageY;
        }, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (evt) {
            currentY = evt.stageY;
            var dy = currentY - beginY;
            if (currentPage == 0 && dy >= 0) {
                pageArray[currentPage].y += dy / 100;
            }
            else if (currentPage == pageArray.length - 1 && dy <= 0) {
                pageArray[currentPage].y += dy / 100;
            }
            else if (dy <= 0) {
                pageArray[currentPage + 1].y += dy / 100;
                pageArray[currentPage].y += dy / 100;
            }
            else {
                pageArray[currentPage].y += dy / 100;
                pageArray[currentPage - 1].y += dy / 100;
            }
        }, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, function (evt) {
            currentY = evt.stageY;
            var dy = currentY - beginY;
            if (currentPage == pageArray.length - 1 && dy <= 0) {
                egret.Tween.get(pageArray[currentPage]).to({ x: 0, y: 0 }, 300);
                egret.Tween.get(pageArray[currentPage - 1]).to({ x: 0, y: -stageH }, 300);
            }
            else if (currentPage == 0 && dy >= 0) {
                egret.Tween.get(pageArray[currentPage]).to({ x: 0, y: 0 }, 300);
                egret.Tween.get(pageArray[currentPage + 1]).to({ x: 0, y: stageH }, 300);
            }
            else if (dy <= -stageH / 2) {
                egret.Tween.get(pageArray[currentPage]).to({ x: 0, y: -stageH }, 300);
                egret.Tween.get(pageArray[currentPage + 1]).to({ x: 0, y: 0 }, 300);
                currentPage++;
            }
            else if (dy > -stageH / 2 && dy <= 0) {
                egret.Tween.get(pageArray[currentPage]).to({ x: 0, y: 0 }, 300);
                egret.Tween.get(pageArray[currentPage + 1]).to({ x: 0, y: stageH }, 300);
            }
            else if (dy > 0 && dy < stageH / 2) {
                egret.Tween.get(pageArray[currentPage]).to({ x: 0, y: 0 }, 300);
                egret.Tween.get(pageArray[currentPage - 1]).to({ x: 0, y: -stageH }, 300);
            }
            else if (dy >= stageH / 2) {
                egret.Tween.get(pageArray[currentPage]).to({ x: 0, y: stageH }, 300);
                egret.Tween.get(pageArray[currentPage - 1]).to({ x: 0, y: 0 }, 300);
                currentPage--;
            }
            console.log(currentPage);
        }, this);
        ///////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////
        var bj01 = this.createBitmapByName("page01bj_jpg");
        bj01.x = 0;
        bj01.y = 0;
        page01.addChild(bj01);
        var earth = this.createBitmapByName("earth_png");
        earth.x = 0;
        earth.y = 0;
        page01.addChild(earth);
        this.picture01 = earth;
        var earth02 = this.createBitmapByName("earth02_png");
        earth02.x = 0;
        earth02.y = 0;
        earth02.alpha = 1;
        page01.addChild(earth02);
        this.picture02 = earth02;
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        var sky2 = this.createBitmapByName("page02bj_jpg");
        page02.addChild(sky2);
        sky2.x = 0;
        sky2.y = 0;
        sky2.width = stageW;
        sky2.height = stageH;
        var march = this.createBitmapByName("March_png");
        page02.addChild(march);
        march.anchorOffsetX = march.width / 2;
        march.anchorOffsetY = march.height / 2;
        march.x = 245 + march.width / 2;
        march.y = -165 + march.height / 2;
        this.picture_march = march;
        var jupiter = this.createBitmapByName("jupiter_png");
        page02.addChild(jupiter);
        jupiter.anchorOffsetX = jupiter.width / 2;
        jupiter.anchorOffsetY = jupiter.height / 2;
        jupiter.x = 150 + jupiter.width / 2;
        jupiter.y = 365 + jupiter.height / 2;
        this.picture_jupiter = jupiter;
        var water = this.createBitmapByName("water_png");
        page02.addChild(water);
        water.anchorOffsetX = water.width / 2;
        water.anchorOffsetY = water.height / 2;
        water.x = 35 + water.width / 2;
        water.y = 600 + water.height / 2;
        this.picture_water = water;
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    p.startAnimation = function (result) {
        var self = this;
        var change = function () {
            var tw = egret.Tween.get(self.picture01);
            var tw2 = egret.Tween.get(self.picture02);
            tw.to({ "alpha": 1 }, 3000);
            tw2.to({ "alpha": 0 }, 3000);
            tw.wait(3000);
            tw2.wait(3000);
            tw.to({ "alpha": 0 }, 3000);
            tw2.to({ "alpha": 1 }, 3000);
            tw.wait(3000);
            tw2.wait(3000);
            tw.call(change, self);
        };
        var zizhuan = function () {
            var tw_jupiter = egret.Tween.get(self.picture_jupiter);
            var tw_march = egret.Tween.get(self.picture_march);
            var tw_water = egret.Tween.get(self.picture_water);
            tw_jupiter.to({ rotation: 360 }, 20000);
            tw_march.to({ rotation: 360 }, 100000);
            tw_water.to({ rotation: 360 }, 5000);
            tw_water.call(zizhuan, self);
        };
        change();
        zizhuan();
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map