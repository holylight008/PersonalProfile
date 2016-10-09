abstract class page extends egret.DisplayObjectContainer{
    constructor(){
        super();
    }
    
    protected createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    abstract change():void;
    abstract draw():void;
}