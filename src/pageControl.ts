class pageControl{
    private pageArray:page[];
    private beginY:number;
    private currentY:number;
    private currentPage:number;
    private self:egret.DisplayObjectContainer;
    constructor(m:egret.DisplayObjectContainer,x:page[]){
        this.beginY=this.currentY=this.currentPage=0;
        this.self=m;
        this.pageArray=x;
    }
    public pageBegin(stageY:number):void{
        this.beginY=stageY;
        console.log("start"+this.beginY);
    }
    public pageMove(stageY:number):void{
        this.currentY = stageY;
        let dy = this.currentY - this.beginY;
        if (this.currentPage == 0 && dy >= 0) {
            this.pageArray[this.currentPage].y += dy / 100;
        } else if (this.currentPage == this.pageArray.length - 1 && dy <= 0) {
            this.pageArray[this.currentPage].y += dy / 100;
        } else if (dy <= 0) {
            this.pageArray[this.currentPage + 1].y += dy / 100;
            this.pageArray[this.currentPage].y += dy / 100;
        } else {
            this.pageArray[this.currentPage].y += dy / 100;
            this.pageArray[this.currentPage - 1].y += dy / 100;
        }
    }
    public pageEnd(stageY:number):void{
        this.currentY=stageY;
        let stageH=this.self.stage.stageHeight;
        let dy = this.currentY - this.beginY;
        console.log("beginY"+this.beginY+"  "+"currentY"+this.currentY+"  "+"dy"+dy);
        if (this.currentPage == this.pageArray.length - 1 && dy <= 0) {
            egret.Tween.get(this.pageArray[this.currentPage]).to({ x: 0, y: 0 }, 300);
            egret.Tween.get(this.pageArray[this.currentPage - 1]).to({ x: 0, y: -stageH }, 300);
        } else if (this.currentPage == 0 && dy >= 0) {
            egret.Tween.get(this.pageArray[this.currentPage]).to({ x: 0, y: 0 }, 300);
            egret.Tween.get(this.pageArray[this.currentPage + 1]).to({ x: 0, y: stageH }, 300);
        } else if (dy <= -stageH / 2) {
            egret.Tween.get(this.pageArray[this.currentPage]).to({ x: 0, y: -stageH }, 300);
            egret.Tween.get(this.pageArray[this.currentPage + 1]).to({ x: 0, y: 0 }, 300);
            this.currentPage++;
        } else if (dy > -stageH / 2 && dy <= 0) {
            egret.Tween.get(this.pageArray[this.currentPage]).to({ x: 0, y: 0 }, 300);
            egret.Tween.get(this.pageArray[this.currentPage + 1]).to({ x: 0, y: stageH }, 300);
        } else if (dy > 0 && dy < stageH / 2) {
            egret.Tween.get(this.pageArray[this.currentPage]).to({ x: 0, y: 0 }, 300);
            egret.Tween.get(this.pageArray[this.currentPage - 1]).to({ x: 0, y: -stageH }, 300);
        } else if (dy >= stageH / 2) {
            egret.Tween.get(this.pageArray[this.currentPage]).to({ x: 0, y: stageH }, 300);
            egret.Tween.get(this.pageArray[this.currentPage - 1]).to({ x: 0, y: 0 }, 300);
            this.currentPage--;
        }
    }

}