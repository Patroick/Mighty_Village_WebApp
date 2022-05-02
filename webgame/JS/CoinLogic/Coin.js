class Coin extends PIXI.Sprite{
    constructor(texture){
        super(PIXI.Texture.from(texture));
        this.increment = 1;
    }

    clickDown(){
        counter.increase(this.increment);
        this.scale.x /= 1.1;
        this.scale.y /= 1.1;
    }

    clickUp(counter){
        this.scale.x *= 1.1;
        this.scale.y *= 1.1;
    }

    hoverOver(){
        this.scale.x /= 1.1;
        this.scale.y /= 1.1;
    }

}