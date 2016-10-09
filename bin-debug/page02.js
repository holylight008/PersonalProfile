var page02 = (function (_super) {
    __extends(page02, _super);
    function page02() {
        _super.call(this);
    }
    var d = __define,c=page02,p=c.prototype;
    p.draw = function () {
        var sky = this.createBitmapByName("page02bj_jpg");
        this.addChild(sky);
        sky.x = 0;
        sky.y = 0;
        var march = this.createBitmapByName("March_png");
        this.addChild(march);
        march.anchorOffsetX = march.width / 2;
        march.anchorOffsetY = march.height / 2;
        march.x = 245 + march.width / 2;
        march.y = -165 + march.height / 2;
        this.picture_march = march;
        var jupiter = this.createBitmapByName("jupiter_png");
        this.addChild(jupiter);
        jupiter.anchorOffsetX = jupiter.width / 2;
        jupiter.anchorOffsetY = jupiter.height / 2;
        jupiter.x = 150 + jupiter.width / 2;
        jupiter.y = 365 + jupiter.height / 2;
        this.picture_jupiter = jupiter;
        var water = this.createBitmapByName("water_png");
        this.addChild(water);
        water.anchorOffsetX = water.width / 2;
        water.anchorOffsetY = water.height / 2;
        water.x = 35 + water.width / 2;
        water.y = 600 + water.height / 2;
        this.picture_water = water;
    };
    p.change = function () {
        var tw_jupiter = egret.Tween.get(this.picture_jupiter);
        var tw_march = egret.Tween.get(this.picture_march);
        var tw_water = egret.Tween.get(this.picture_water);
        tw_jupiter.to({ rotation: 360 }, 20000);
        tw_march.to({ rotation: 360 }, 100000);
        tw_water.to({ rotation: 360 }, 5000);
        tw_water.call(this.change, this);
    };
    return page02;
}(page));
egret.registerClass(page02,'page02');
//# sourceMappingURL=page02.js.map