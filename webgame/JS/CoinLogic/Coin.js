class Coin extends PIXI.Sprite{
    constructor(texture){
        super(texture);
        this.increment = 1;
    }

    click(counter){
        counter.increase();
    }

}