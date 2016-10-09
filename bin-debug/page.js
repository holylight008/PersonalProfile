var page = (function (_super) {
    __extends(page, _super);
    function page() {
        _super.call(this);
    }
    var d = __define,c=page,p=c.prototype;
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return page;
}(egret.DisplayObjectContainer));
egret.registerClass(page,'page');
//# sourceMappingURL=page.js.map