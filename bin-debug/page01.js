var page01 = (function (_super) {
    __extends(page01, _super);
    function page01() {
        _super.call(this);
    }
    var d = __define,c=page01,p=c.prototype;
    p.draw = function () {
        var bj01 = this.createBitmapByName("page01bj_jpg");
        bj01.x = 0;
        bj01.y = 0;
        this.addChild(bj01);
        var earth = this.createBitmapByName("earth_png");
        earth.x = 0;
        earth.y = 0;
        this.addChild(earth);
        this.picture01 = earth;
        var earth02 = this.createBitmapByName("earth02_png");
        earth02.x = 0;
        earth02.y = 0;
        earth02.alpha = 1;
        this.addChild(earth02);
        this.picture02 = earth02;
    };
    p.change = function () {
        var tw = egret.Tween.get(this.picture01);
        var tw2 = egret.Tween.get(this.picture02);
        tw.to({ "alpha": 1 }, 3000);
        tw2.to({ "alpha": 0 }, 3000);
        tw.wait(3000);
        tw2.wait(3000);
        tw.to({ "alpha": 0 }, 3000);
        tw2.to({ "alpha": 1 }, 3000);
        tw.wait(3000);
        tw2.wait(3000);
        tw.call(this.change, this);
    };
    return page01;
}(page));
egret.registerClass(page01,'page01');
//# sourceMappingURL=page01.js.map