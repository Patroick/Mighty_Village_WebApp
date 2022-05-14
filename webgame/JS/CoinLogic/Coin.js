class Coin extends PIXI.Sprite{
    constructor(texture, audio){
        super(PIXI.Texture.from(texture));
        this.increment = 1;
        this.sound = PIXI.sound.Sound.from({
            url: audio,
            volume: 0.15
        });
    }

    clickDown(){
        counter.increase(this.increment);
        this.scale.x /= 1.1;
        this.scale.y /= 1.1;
        this.sound.play();
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