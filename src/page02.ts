class page02 extends page{
    private picture_jupiter:egret.Bitmap;
    private picture_march:egret.Bitmap;
    private picture_water:egret.Bitmap;
    constructor(){
        super();
    }
    public draw():void{
        var sky: egret.Bitmap = this.createBitmapByName("page02bj_jpg");
        this.addChild(sky);
        sky.x=0;
        sky.y=0;

        var march:egret.Bitmap=this.createBitmapByName("March_png");
        this.addChild(march);
        march.anchorOffsetX=march.width/2;
        march.anchorOffsetY=march.height/2;
        march.x=245+march.width/2;
        march.y=-165+march.height/2;
        this.picture_march=march;

        var jupiter:egret.Bitmap=this.createBitmapByName("jupiter_png")
        this.addChild(jupiter);
        jupiter.anchorOffsetX=jupiter.width/2;
        jupiter.anchorOffsetY=jupiter.height/2;
        jupiter.x=150+jupiter.width/2;
        jupiter.y=365+jupiter.height/2;
        this.picture_jupiter=jupiter;

        var water:egret.Bitmap=this.createBitmapByName("water_png")
        this.addChild(water);
        water.anchorOffsetX=water.width/2;
        water.anchorOffsetY=water.height/2;
        water.x=35+water.width/2;
        water.y=600+water.height/2;
        this.picture_water=water;
    }
    public change():void{
        var tw_jupiter=egret.Tween.get(this.picture_jupiter);
        var tw_march=egret.Tween.get(this.picture_march);
        var tw_water=egret.Tween.get(this.picture_water);
        tw_jupiter.to({rotation:360},20000);
        tw_march.to({rotation:360},100000);
        tw_water.to({rotation:360},5000);
        tw_water.call(this.change,this);
    }
}